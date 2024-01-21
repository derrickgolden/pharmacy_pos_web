import express, {Request, Response} from 'express';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import multer from 'multer'
import path from 'path'

require('dotenv').config();

import adminauth from './user/routes/auth'
import medicinegroup from './user/routes/inventory/medicineGroup'
import medicineList from './user/routes/inventory/medicineList'
import sales from './user/routes/sales/registerSales'
import report from './user/routes/sales/getSalesReport'
import pharmacy from './user/routes/pharmacy'
import stock from './user/routes/stock'
import {authenticateToken} from './user/middlewares/authenticateToken';

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        console.log("destination", file);

        const absolutePath = path.resolve(__dirname, 'upload');
        callback(null, absolutePath);
        // callback(null, "uploads");
    },
    filename: (req, file, callback) => {
        console.log("file", file);
        
      callback(null, Date.now() + '-' + file.originalname);
    },
  });

const upload = multer({ storage: storage });

const app = express();
app.use(cors());
// app.use(cors({origin: allowedDomains}))
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(compression())
app.use(cookieParser())

const port = process.env.SEVERPORT || 5020

app.use("/js", express.static(path.join(__dirname, 'dist', 'assets', 'index-TSNK7VKS.js')));
app.use(express.static(path.join(__dirname, 'dist')));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.use("/user", adminauth);
app.use("/user", upload.single('logo'), authenticateToken, pharmacy);
app.use("/user/inventory", medicinegroup);
app.use("/user/inventory", medicineList);
app.use("/user/sales", sales);
app.use("/user/sales", report);
app.use("/user/stock", stock);

app.use('/uploads', express.static('uploads'));

  const serverInstance = app.listen(port, ()=>{
      console.log("Listening to port: ", port);
  })
export const server = () =>{
  return serverInstance;
}

