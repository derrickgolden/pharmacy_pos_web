import express, {Request, Response} from 'express';
import { universalResponse } from 'user/types/universalResponse';
import { addMedicine, deleteMedicine, getMedicineList } from '../../dbServices/inventory/medicineList';

const router = express.Router();


router.post('/add-medicine', async(req: Request, res: Response) =>{
    const body = req.body;
    const img_file = req.file;
    // console.log(body);
    
    try {
        const response:universalResponse = await addMedicine(body, img_file)
        response.success ? 
            res.status(200).json(response):
            res.status(302).json(response)
        
    } catch (error) {
        console.log(error)
        res.status(302).json({success: false, msg: "sever side error", err: error.message})
    }
});

router.get('/get-medicine', async(req: Request, res: Response) =>{

    try {
        const response:universalResponse = await getMedicineList()
        response.success ? 
            res.status(200).json(response):
            res.status(302).json(response)
        
    } catch (error) {
        console.log(error)
        res.status(302).json({success: false, msg: "sever side error", err: error.message})
    }
});

router.post('/delete', async(req: Request, res: Response) =>{
    const {medicine_id} = req.body;
    
    try {
        const response:universalResponse = await deleteMedicine(medicine_id)
        response.success ? 
            res.status(200).json(response):
            res.status(302).json(response)
        
    } catch (error) {
        console.log(error)
        res.status(302).json({success: false, msg: "sever side error", err: error.message})
    }
});

export default router;