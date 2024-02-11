
export interface RegisterSalesProp{
    orderDetails: [];
    totalPrice: number;
    moneyTrans: {
        customerGave: number, 
        change: {};
    };
    updateStock: {medicine_id: number, remainingContainers: number, remainingUnits: number}[];
    pharmacy_id: number;
}

export interface RegisterPharmacyProps{
    pharmacyDetails:{
        pharmacy_name: string;
        location: string;
        pharmacy_email: string;
        pharmacy_tel: string;
        extra_info: string;
    }
    user: {
        user_id: number
    }
    logo: {
        path: string
    }
}