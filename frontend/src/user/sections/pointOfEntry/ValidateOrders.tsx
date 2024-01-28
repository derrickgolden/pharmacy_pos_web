import React, { useState } from "react";
import CustomerInvoice from "../../components/pointOfEntry/CustomerInvoice";
import PaymentCalc from "../../components/pointOfEntry/PaymentCalc"
import PaymentMethod from "../../components/pointOfEntry/PaymentMethod";
import { calcAndSetChange } from "../../controllers/calculations/calcAndSetChange";

interface ValidateOrdersProps{
    handleVilidateClick: () => void;
    totalPrice: number;
    setPayMethods: () => void;
    payMethods: []
}
export type PaymentObject = {
    [key: string]: number;
};

const ValidateOrders: React.FC<ValidateOrdersProps> = (
    {handleVilidateClick, totalPrice, setPayMethods, payMethods}) =>{

    const [customerGave, setCustomeGave] = useState<PaymentObject>({})
    const [change, setChange] = useState({remaining: 0.00, change: 0.00})
    const [activePayMethod, setActivePayMethod] = useState("")
    const [startNewEntry, setStartNewEntry] = useState(true);

    const PaymentCalcHandles = {
        handleDigitClick: (digit: number) =>{
            setCustomeGave((obj) => {
                const newFig = startNewEntry? digit : Number(obj[activePayMethod] + String(digit)) || 0;

                // remove the method being added first;
                const {[activePayMethod]: removedKey, ...newObj} = obj;
                const sum = Object.values(newObj).reduce((acc, curr) => acc + curr, 0);
                const totals = Number( sum + newFig)
                // console.log(totals)

                calcAndSetChange(totals, totalPrice, setChange);

                return {...obj ,[activePayMethod]: newFig};
            });
            setStartNewEntry(false);
        },
        handleDeleteDigit: () =>{
            setCustomeGave((obj) => {
                let numberString = obj[activePayMethod].toString();
                
                let modifiedString = numberString.slice(0, -1);

                let newFig = parseFloat(modifiedString) || 0;

                // remove the method being deleted;
                const {[activePayMethod]: removedKey, ...newObj} = obj;
                // calculate new totals
                const sum = Object.values(newObj).reduce((acc, curr) => acc + curr, 0);
                const totals = Number( sum + newFig)

                calcAndSetChange(totals, totalPrice, setChange);

                return {...newObj, [activePayMethod] : newFig};
            })
        },
        handleSetToQuantityChange: (digit: number) =>{
            setCustomeGave((obj) => {
                const newFig = startNewEntry? digit : obj[activePayMethod] + digit;

                // remove the method being added first;
                const {[activePayMethod]: removedKey, ...newObj} = obj;
                const sum = Object.values(newObj).reduce((acc, curr) => acc + curr, 0);
                const totals = Number( sum + newFig)
                // console.log(totals)

                calcAndSetChange(totals, totalPrice, setChange);

                return {...obj ,[activePayMethod]: newFig};
            });
            setStartNewEntry(false);
            
        }

    }
    return(
        <div className="d-flex">
            <PaymentMethod 
                handleVilidateClick = {handleVilidateClick}
                setPayMethods = {setPayMethods}
                activePayMethod = {activePayMethod}
                totalPrice = {totalPrice}
                payMethods = {payMethods}
                customerGave = {customerGave}
                change = {change}
                setCustomeGave = {setCustomeGave}
                setActivePayMethod = {setActivePayMethod}
                setChange = {setChange}
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