import express, {Request, Response} from 'express';
import { 
    addMedicineGroup, 
    getMedicineGroups, 
    shiftMedicineGroup, 
    updateMedicineDetails 
} from '../../dbServices/inventory/medicineGroup';
import { medicinegroupDetails } from 'user/types/medicineGroupTypes';
import { universalResponse } from 'user/types/universalResponse';

const router = express.Router();

router.post('/add-group', async(req: Request, res: Response) =>{
    const { group_name, description, pharmacy_id }: medicinegroupDetails = req.body;
    const token: string = req.header('Authorization');

    try {
        const response:universalResponse = await addMedicineGroup({group_name, description, pharmacy_id})
        response.success ? 
            res.status(200).json(response):
            res.status(302).json(response)
        
    } catch (error) {
        console.log(error)
        res.status(302).json({success: false, msg: "sever side error", err: error.message})
    }
});

router.post('/get-groups', async(req: Request, res: Response) =>{
    const {filterNull, pharmacy_id} = req.body || false
        
    try {
        const response:universalResponse = await getMedicineGroups(filterNull, pharmacy_id);
        response.success ? 
            res.status(200).json(response):
            res.status(302).json(response)
        
    } catch (error) {
        console.log(error)
        res.status(302).json({success: false, msg: "sever side error", err: error.message})
    }
});

router.post('/update', async(req: Request, res: Response) =>{
    const body = req.body;
    
    try {
        const response:universalResponse = await updateMedicineDetails (body)
        response.success ? 
            res.status(200).json(response):
            res.status(302).json(response)
        
    } catch (error) {
        console.log(error)
        res.status(302).json({success: false, msg: "sever side error", err: error.message})
    }
});

router.patch('/shift-group', async(req: Request, res: Response) =>{
    const body = req.body;
    
    try {
        const response:universalResponse = await shiftMedicineGroup(body)
        response.success ? 
            res.status(200).json(response):
            res.status(302).json(response)
        
    } catch (error) {
        console.log(error)
        res.status(302).json({success: false, msg: "sever side error", err: error.message})
    }
});

export default router;