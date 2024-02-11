import express, {Request, Response} from 'express';
import { ModifiedReq, universalResponse } from 'user/types/universalResponse';
import { getStockDetails, updateStockDetails } from '../dbServices/stock';

const router = express.Router();

router.post('/update', async(req: ModifiedReq, res: Response) =>{
    const newStockDetails = req.body;
    console.log(newStockDetails);
    
    
    try {
        const response:universalResponse = await updateStockDetails(newStockDetails);
        response.err ? 
            res.status(302).json(response):
            res.status(200).json(response)
        
    } catch (error) {
        console.log(error)
        res.status(302).json({success: false, msg: "sever side error", err: error.message})
    }
});

router.post('/stock-details', async(req: ModifiedReq, res: Response) =>{
    const {user_id} = req.user;
    const {pharmacy_id} = req.body;

    try {
        const response:universalResponse = await getStockDetails(user_id, pharmacy_id);
        response.success ? 
            res.status(200).json(response):
            res.status(302).json(response)
        
    } catch (error) {
        console.log(error)
        res.status(302).json({success: false, msg: "sever side error", err: error.message})
    }
});

export default router;