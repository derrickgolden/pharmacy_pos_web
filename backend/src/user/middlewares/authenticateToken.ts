// middleware/authenticate.js
import {Request, Response, NextFunction} from 'express';
import { ModifiedReq } from 'user/types/universalResponse';

const jwt = require('jsonwebtoken');
require('dotenv').config()

// const adminAccess = new RevokedAdminCache()
export const authenticateToken = async(req: ModifiedReq, res: Response, next: NextFunction) =>{
  const token = req.header('Authorization');
  const {reset_password, email} = req.body;
  
  if (!token) {
    return res.status(200).send({success: false, reLogin: true, msg: "No authentication token: Login"});
  }

  jwt.verify(token, "skajskdhcdhsjhdwe836", (err: any, user: any) => {
    if (err) {
        const msg = reset_password? "Link expired or Invalid." : "Could not parse your authentication token. Please try to Login again."
      return res.status(200).send({
        success: false, msg, reLogin: true,
        });
    }
    if(reset_password && email !== user.email){
        return res.status(200).send({
            success: false, msg : "Email does not match"
            });
    }
    req.user = user;
    
    next();
  });
}

module.exports = {
    authenticateToken

} 