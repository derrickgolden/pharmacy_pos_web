
import React, { useEffect, useState } from "react";
import { BsCashCoin } from "react-icons/bs";
import { FaAngleRight, FaRegCreditCard } from "react-icons/fa";
import { MdAccountBalanceWallet, MdCancel } from "react-icons/md";
import { PaymentObject } from "../../sections/pointOfEntry/ValidateOrders";
import { calcAndSetChange } from "../../controllers/calculations/calcAndSetChange";

const payments = [
    {icon:<BsCashCoin size={24}/>, method_name: "Cash", method: "cash", payment_method_id: 1},
    {icon:<FaRegCreditCard size={24}/>, method_name: "Bank", method: "bank", payment_method_id: 3},
    {icon:<MdAccountBalanceWallet size={24}/>, method_name: "Customer Account", method: "customer_acc", payment_method_id: 2},
]
interface PaymentMethodProps{
    handleVilidateClick: (customerGave: number, change: {}) =>void;
    setPayMethods: React.Dispatch<React.SetStateAction<string[]>>;
    totalPrice: number;
    payMethods: string[];
    activePayMethod: string;
    customerGave: {};
    change: {remaining: number };
    setCustomeGave: React.Dispatch<React.SetStateAction<PaymentObject>>;
    setActivePayMethod: React.Dispatch<React.SetStateAction<string>>;
    setChange: React.Dispatch<React.SetStateAction<{ remaining: number; change: number; }>>;
}
interface PaymentProps{
    icon: JSX.Element;
    method_name: string;
    method: string;
    payment_method_id: number;
}
const PaymentMethod: React.FC<PaymentMethodProps> = ({handleVilidateClick, setPayMethods, totalPrice,
    payMethods, activePayMethod, customerGave, change, setCustomeGave, setActivePayMethod, setChange}) =>{
      
    const [ isValidateEnabled, setIsvalidateEnabled ] = useState(true)
    const handlePaymentMethod = (payment: PaymentProps) =>{
        if (!payMethods.includes(payment.method_name)) {
            setPayMethods([...payMethods, payment.method_name]);
            setCustomeGave((obj) => {
                obj[payment.method_name] = payMethods.length? 0 : totalPrice;
                payMethods.length? null : setChange({change: 0.00, remaining: 0.00})
                return obj;
            });
            setActivePayMethod(payment.method_name)
        }
    }

    const handleRemovePayment = (method: string) =>{
        
        setPayMethods((arr) => (arr.filter((payMethod) => payMethod !== method)));
        setCustomeGave((obj) => {
            const removedMethod = method;
            const {[removedMethod]: removedKey, ...newObj} = obj;
            
            const totals = Object.values(newObj).reduce((acc, curr) => acc + curr, 0);

            calcAndSetChange(totals, totalPrice, setChange);
            
            const newActiveMethod = payMethods.find((payMethod) => payMethod !== method) || '';
            setActivePayMethod(newActiveMethod);

            return newObj;
        });
        // const activeMethod = 
    }

    return(
        <div className="col-3 d-flex flex-column" style={{height: "80vh"}}>
            <div className="py-2">
                <h3>Payment Method</h3>
            </div>
            <div className="ordersCard" style={{height: "60vh"}}>
                {
                    payments.map((payment, i)=>(
                        <button  key={i} onClick={() =>  handlePaymentMethod(payment)}
                        className="d-flex p-2 btn border gap-3 cursor-pointer col-12">
                            {/* {payment.icon} */}
                            <h6>{payment.method_name}</h6>
                        </button>
                    ))
                }
                <div className="d-flex mt-2">
                    <h4>Summary</h4>
                </div>
                {
                    payMethods.map((method, i) =>(
                        <div key={i} onClick={() => setActivePayMethod(method)}
                        className={`${activePayMethod === method? "bg-light ": ""} d-flex py-4 px-2 
                        border justify-content-between `}>
                            <h6>{method}</h6>
                            <div className="d-flex gap-4">
                                <h6>
                                    { customerGave[method] } 
                                    <span>Ksh</span>
                                </h6>
                                <MdCancel size={24} 
                                onClick={() => handleRemovePayment(method)} />
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="d-flex flex-grow-1 border 
            justify-content-center text-center">
                <button onClick={() =>{
                    setIsvalidateEnabled(false);
                    handleVilidateClick(customerGave, change)
                } } 
                disabled={!change.remaining && payMethods.length && isValidateEnabled ? false : true}
                className="btn btn-warning flex-grow-1 font-weight-bold"> 
                    <FaAngleRight size={24}/> 
                    <p style={{fontSize: "24px"}}>Validate</p>
                </button>
            </div>
        </div>
    )
}

export default PaymentMethod;