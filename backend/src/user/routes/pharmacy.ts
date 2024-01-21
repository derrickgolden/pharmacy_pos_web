import express, {Request, Response} from 'express';
import { ModifiedReq, universalResponse } from 'user/types/universalResponse';
import { getPharmacyListDetails, registerPharmacy } from '../dbServices/pharmacy';

const router = express.Router();

router.post('/register-pharmacy', async(req: ModifiedReq, res: Response) =>{
    const pharmacyDetails = req.body;
    const user = req.user
    const logo = req.file

    if(user.added_by !== user.user_id){
       return  res.status(200).json({success: false, msg: "Only user registered as owner is allowed to register a pharmacy"})
    }
    
    try {
        const response:universalResponse = await registerPharmacy({pharmacyDetails, user, logo});
        response.success ? 
            res.status(200).json(response):
            res.status(302).json(response)
        
    } catch (error) {
        console.log(error)
        res.status(302).json({success: false, msg: "sever side error", err: error.message})
    }
});

router.get('/pharmacy-details', async(req: ModifiedReq, res: Response) =>{
    const {added_by} = req.user;
    
    try {
        const response:universalResponse = await getPharmacyListDetails(added_by);
        response.success ? 
            res.status(200).json(response):
            res.status(302).json(response)
        
    } catch (error) {
        console.log(error)
        res.status(302).json({success: false, msg: "sever side error", err: error.message})
    }
});

export default router;