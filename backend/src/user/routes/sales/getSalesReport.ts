import express, {Request, Response} from 'express';
import { universalResponse } from 'user/types/universalResponse';
import { getSalesReport } from '../../dbServices/sales/getSalesReport';

const router = express.Router();

router.post('/get-sales', async(req: Request, res: Response) =>{
    const {pharmacy_id} = req.body;

    try {
        const response:universalResponse = await getSalesReport(pharmacy_id);
        response.success ? 
            res.status(200).json(response):
            res.status(302).json(response)
        
    } catch (error) {
        console.log(error)
        res.status(302).json({success: false, msg: "sever side error", err: error.message})
    }
});

export default router;