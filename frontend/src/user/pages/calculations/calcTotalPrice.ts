import { OrderDetail } from "../SalesEntry";

interface OrdersList {
    date: string;
    orderDetails: OrderDetail[];
    activeOrder: boolean;
    status: string;
    totalPrice: number;
};

export const calcTotalPrice = (orderDetails: OrderDetail[]) =>{
    const newTotalPrice =  orderDetails.reduce((total, item) => {
            return total + Number(item.sub_total);
          }, 0) 
       
    return newTotalPrice;
}