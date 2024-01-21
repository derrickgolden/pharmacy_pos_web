export interface medicineDetailsProp{
    pricingDetails:{
        price: number,
        unit_of_mesurement: string, 
        package_size: number
    };
    newMedicineDetails:{
        medicine_code: string, 
        medicine_name: string, 
        stock_qty: number, 
        instructions: string, 
        side_effect: string, 
        group_id: number,
        img_path: string,
    }
}
export interface medicineDetailsProps{
    price: number,
    unit_of_mesurement: string, 
    package_size: number
    
    medicine_code: string, 
    medicine_name: string, 
    stock_qty: number, 
    instructions: string, 
    side_effect: string, 
    group_id: number,
    img_path: string,
    
}

export interface updateMedicineDetailsProps{
    medicine_id: number, warning_limit: number, medicine_name: string
}