import express, {Request, Response} from 'express';
import { ModifiedReq, universalResponse } from 'user/types/universalResponse';
import { registerSales } from '../../dbServices/sales/registerSales';

const router = express.Router();


router.post('/register-sales', async(req: ModifiedReq, res: Response) =>{
    const saleDetails = req.body;
    const {user_id} = req.user;

    try {
        const response:universalResponse = await registerSales(saleDetails, user_id);
        response.success ? 
            res.status(200).json(response):
            res.status(302).json(response)
        
    } catch (error) {
        console.log(error)
        res.status(302).json({success: false, msg: "sever side error", err: error.message})
    }
});

export default router;