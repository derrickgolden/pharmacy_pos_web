import axios from "axios";
import { server_baseurl } from "../../../baseUrl";
import Swal from "sweetalert2";
import { OrderDetail } from "../SalesEntry";
import { SaleRes } from "../types";
import { Order } from "../../sections/pointOfEntry/types";
import { Dispatch, SetStateAction } from "react";

interface handleAddGroupProps{
    orderDetails: OrderDetail[];
    totalPrice : number;
    setOrdersList: Dispatch<SetStateAction<Order[]>>;
    moneyTrans: {};
    updateStock: {}[];
    payMethods: string[];
    setEntryStep: (step: string) =>void;
    setSaleRes: (saleRes: SaleRes) =>void;
    pharmacy_id: number;
}
export const regiterSalesApi = ({
    orderDetails, totalPrice, setOrdersList, moneyTrans, updateStock, payMethods, setEntryStep, setSaleRes, pharmacy_id
}: handleAddGroupProps) =>{

    const tokenString = sessionStorage.getItem("userToken");

    if (tokenString !== null) {
        var token = JSON.parse(tokenString);
    } else {
        Swal.fire({
            title: "Token not Found",
            text: "Try to login Again then add the group.",
            icon: "warning"
        });
        return
    }

    let data = JSON.stringify({orderDetails, totalPrice, moneyTrans, updateStock, payMethods, pharmacy_id});
    
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${server_baseurl}/user/sales/register-sales`,
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        },
        data : data
    };

    axios.request(config)
    .then((response) => {
        if(response.data.success){
            setSaleRes(response.data.details[0]);
            setEntryStep("receipt");
            setOrdersList(arr =>{
                return arr.map(order => order.activeOrder? {...order, status: "receipt"} : order)
            })
        }else{
            Swal.fire({
                title: "Failed",
                text: `${response.data.msg}`,
                icon: "warning"
            });
        }
    })
    .catch((error) => {
        console.log(error);
        Swal.fire({
            title: "Oooops...",
            text: `Server side error`,
            icon: "warning"
        });
    });   
}