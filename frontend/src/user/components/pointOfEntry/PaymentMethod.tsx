
import React, { useEffect, useState } from "react";
import { BsCashCoin } from "react-icons/bs";
import { FaAngleRight, FaRegCreditCard } from "react-icons/fa";
import { MdAccountBalanceWallet, MdCancel } from "react-icons/md";
import { PaymentObject } from "../../sections/pointOfEntry/ValidateOrders";
import { calcAndSetChange } from "../../controllers/calculations/calcAndSetChange";
import Swal from "sweetalert2";
import ChangeDisplay from "./ChangeDisplay";

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
    payMethods, activePayMethod, customerGave, change, setCustomeGave, setActivePayMethod, setChange, 
    PaymentCalcHandles }) =>{
      
    const [ isValidateEnabled, setIsvalidateEnabled ] = useState(true)
    const currentWidth = window.innerWidth;

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
    }

    const handleChangeAmount = async(method: string) =>{

        setActivePayMethod(method)
        // setStartNewEntry(true);
        if(method === activePayMethod && currentWidth < 768){
            await Swal.fire({
                title: "Enter new amount",
                input: "number",
                showCancelButton: true,
                confirmButtonText: "Confirm",
            }).then((result) => {
                if (result.isConfirmed) {
                    PaymentCalcHandles.handleDigitClick(result.value)
                }
            });
        }
        
    }

    return(
        <div className="col-12 col-md-3 d-flex flex-column" >
            {
                currentWidth < 768 && 
                <ChangeDisplay 
                    payMethods = {payMethods} 
                    totalPrice = {totalPrice} 
                    change = {change}
                />
            }
            <div className="p-2">
                <h3>Payment Method</h3>
            </div>
            <div className="ordersCard" style={{height: "60dvh"}}>
                {
                    payments.map((payment, i)=>(
                        <button  key={i} onClick={() =>  handlePaymentMethod(payment)}
                        className="d-flex p-2 btn border gap-3 cursor-pointer col-12">
                            {/* {payment.icon} */}
                            <h6>{payment.method_name}</h6>
                        </button>
                    ))
                }
                <div className="px-2 mt-2">
                    <h4>Summary</h4>
                </div>
                {
                    payMethods.map((method, i) =>(
                        <div className={`${activePayMethod === method? "bg-light ": ""} d-flex py-4 px-2 border col-12
                        justify-content-between`}>
                            <div key={i} onClick={() => handleChangeAmount(method)}
                            className={`col-10 d-flex 
                             justify-content-between `}>
                                <h6>{method}</h6>
                                <div className="d-flex gap-4">
                                    <h6>
                                        { customerGave[method] } 
                                        <span>Ksh</span>
                                    </h6>
                                </div>
                            </div>
                                    <MdCancel size={24} 
                                    onClick={() => handleRemovePayment(method)} />
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
                className="btn btn-warning rounded-none flex-grow-1 font-weight-bold"> 
                    <FaAngleRight size={24}/> 
                    <p style={{fontSize: "24px"}}>Validate</p>
                </button>
            </div>
        </div>
    )
}

export default PaymentMethod;

// <!-- Button trigger modal -->
// <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
//   Launch demo modal
// </button>

// <!-- Modal -->
// <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//   <div class="modal-dialog">
//     <div class="modal-content">
//       <div class="modal-header">
//         <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
//         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//       </div>
//       <div class="modal-body">
//         ...
//       </div>
//       <div class="modal-footer">
//         <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//         <button type="button" class="btn btn-primary">Save changes</button>
//       </div>
//     </div>
//   </div>
// </div>