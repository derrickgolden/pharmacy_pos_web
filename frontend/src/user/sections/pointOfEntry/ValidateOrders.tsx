import React, { useState } from "react";
import CustomerInvoice from "../../components/pointOfEntry/CustomerInvoice";
import PaymentCalc from "../../components/pointOfEntry/PaymentCalc"
import PaymentMethod from "../../components/pointOfEntry/PaymentMethod";

interface ValidateOrdersProps{
    handleVilidateClick: () => void;
    totalPrice: number;
    setPayMethods: () => void;
    payMethods: []
}
const ValidateOrders: React.FC<ValidateOrdersProps> = (
    {handleVilidateClick, totalPrice, setPayMethods, payMethods}) =>{

    const [customerGave, setCustomeGave] = useState(totalPrice)
    const [change, setChange] = useState({remaining: 0.00, change: 0.00})

    const PaymentCalcHandles = {
        handleDigitClick: (digit: number) =>{
            setCustomeGave((fig) => {
                const newFig = Number(fig + String(digit))
                if(newFig < totalPrice) {
                    setChange({change: 0.00, remaining: (totalPrice - newFig)})
                }else{
                    setChange({change: (newFig - totalPrice), remaining: 0.00})
                }
                return newFig;
            });
            
        },
        handleDeleteDigit: () =>{
            setCustomeGave((fig) => {
                let numberString = fig.toString();
                
                let modifiedString = numberString.slice(0, -1);

                let newFig = parseFloat(modifiedString) || 0;

                if(newFig < totalPrice) {
                    const remaining = newFig ? (totalPrice - newFig) : newFig
                    setChange({change: 0.00, remaining})
                }else{
                    setChange({change: (newFig - totalPrice), remaining: 0.00})
                }

                return newFig;
            })
        }

    }
    return(
        <div className="d-flex">
            <PaymentMethod 
                handleVilidateClick = {handleVilidateClick}
                setPayMethods = {setPayMethods}
                totalPrice = {totalPrice}
                payMethods = {payMethods}
                customerGave = {customerGave}
                change = {change}
            />
            <PaymentCalc 
                change = {change}
                totalPrice = {totalPrice}
                payMethods = {payMethods}
                PaymentCalcHandles = {PaymentCalcHandles}
            />
            <CustomerInvoice />
        </div>
    )
}

export default ValidateOrders;