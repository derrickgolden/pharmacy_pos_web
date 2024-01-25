import {Request} from 'express';

export interface universalResponse{
    success: boolean;
    admin_id?: number;
    msg: string;
    details?: Array<{}>;
    err?: string | boolean;
}

export interface ModifiedReq extends Request{
    user: {
        user_id: number;
        added_by: number;
        email: string;
    }
}