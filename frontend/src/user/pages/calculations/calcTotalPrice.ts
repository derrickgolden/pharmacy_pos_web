import { OrderDetail } from "../SalesEntry";

export const calcTotalPrice = (orderDetails: OrderDetail[]) =>{
    const newTotalPrice =  orderDetails.reduce((total, item) => {
            return total + Number(item.sub_total);
          }, 0) 
       
    return newTotalPrice;
}