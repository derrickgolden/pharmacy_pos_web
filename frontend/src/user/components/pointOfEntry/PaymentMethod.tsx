
import React from "react";
import { BsCashCoin } from "react-icons/bs";
import { FaAngleRight, FaRegCreditCard } from "react-icons/fa";
import { MdAccountBalanceWallet, MdCancel } from "react-icons/md";

const payments = [
    {icon:<BsCashCoin size={24}/>, text: "Cash", method: "cash"},
    {icon:<FaRegCreditCard size={24}/>, text: "Bank", method: "bank"},
    {icon:<MdAccountBalanceWallet size={24}/>, text: "Customer Account", method: "customer_acc"},
]
interface PaymentMethodProps{
    handleVilidateClick: (customerGave: number, change: {}) =>void;
    setPayMethods: (method: string) => void;
    payMethods: string[];
    totalPrice: number;
    customerGave: number;
    change: {remaining: number }
}
const PaymentMethod: React.FC<PaymentMethodProps> = (
    {handleVilidateClick, setPayMethods, payMethods, totalPrice, customerGave, change}) =>{
    return(
        <div className="col-3 d-flex flex-column" style={{height: "80vh"}}>
            <div className="py-2">
                <h3>Payment Method</h3>
            </div>
            {
                payments.map((payment, i)=>(
                    <button  key={i} onClick={() => setPayMethods((arr) => ([payment.text]))}
                    className="d-flex p-2 btn border gap-3 cursor-pointer">
                        {payment.icon}
                        <h6>{payment.text}</h6>
                    </button>
                ))
            }
            <div className="d-flex mt-2">
                <h4>Summary</h4>
            </div>
            {
                payMethods.map((method, i) =>(
                    <div key={i}
                    className="d-flex py-4 px-2 border justify-content-between">
                        <h6>{method}</h6>
                        <div className="d-flex gap-4">
                            <h6>{customerGave || totalPrice} <span>Ksh</span></h6>
                            <MdCancel size={24} 
                            onClick={() => setPayMethods((arr) => (arr.filter((payMethod) => payMethod !== method)))} />
                        </div>
                    </div>
                ))
            }
            <div className="d-flex flex-grow-1 border 
            justify-content-center text-center">
                <button onClick={() => handleVilidateClick(customerGave, change)} 
                disabled={!change.remaining && payMethods.length? false : true}
                className="btn btn-warning flex-grow-1 font-weight-bold"> 
                    <FaAngleRight size={24}/> 
                    <p style={{fontSize: "24px"}}>Validate</p>
                </button>
            </div>
        </div>
    )
}

export default PaymentMethod;