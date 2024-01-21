"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
require('dotenv').config();
const auth_1 = __importDefault(require("./user/routes/auth"));
const medicineGroup_1 = __importDefault(require("./user/routes/inventory/medicineGroup"));
const medicineList_1 = __importDefault(require("./user/routes/inventory/medicineList"));
const registerSales_1 = __importDefault(require("./user/routes/sales/registerSales"));
const getSalesReport_1 = __importDefault(require("./user/routes/sales/getSalesReport"));
const pharmacy_1 = __importDefault(require("./user/routes/pharmacy"));
const stock_1 = __importDefault(require("./user/routes/stock"));
const authenticateToken_1 = require("./user/middlewares/authenticateToken");
const storage = multer_1.default.diskStorage({
    destination: (req, file, callback) => {
        console.log("destination", file);
        const absolutePath = path_1.default.resolve(__dirname, 'upload');
        callback(null, absolutePath);
        // callback(null, "uploads");
    },
    filename: (req, file, callback) => {
        console.log("file", file);
        callback(null, Date.now() + '-' + file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// app.use(cors({origin: allowedDomains}))
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, compression_1.default)());
app.use((0, cookie_parser_1.default)());
const port = process.env.SEVERPORT || 5020;
app.use("/js", express_1.default.static(path_1.default.join(__dirname, 'dist', 'assets', 'index-TSNK7VKS.js')));
app.use(express_1.default.static(path_1.default.join(__dirname, 'dist')));
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'dist', 'index.html'));
});
app.use("/user", auth_1.default);
app.use("/user", upload.single('logo'), authenticateToken_1.authenticateToken, pharmacy_1.default);
app.use("/user/inventory", medicineGroup_1.default);
app.use("/user/inventory", medicineList_1.default);
app.use("/user/sales", registerSales_1.default);
app.use("/user/sales", getSalesReport_1.default);
app.use("/user/stock", stock_1.default);
app.use('/uploads', express_1.default.static('uploads'));
const server = () => {
    const serverInstance = app.listen(port, () => {
        console.log("Listening to port: ", port);
    });
    return serverInstance;
};
exports.server = server;
//# sourceMappingURL=app.js.map