import express, {Request, Response} from 'express';
import { universalResponse } from 'user/types/universalResponse';
import { registerSales } from '../../dbServices/sales/registerSales';

const router = express.Router();


router.post('/register-sales', async(req: Request, res: Response) =>{
    const saleDetails = req.body;

    try {
        const response:universalResponse = await registerSales(saleDetails);
        response.success ? 
            res.status(200).json(response):
            res.status(302).json(response)
        
    } catch (error) {
        console.log(error)
        res.status(302).json({success: false, msg: "sever side error", err: error.message})
    }
});

export default router;