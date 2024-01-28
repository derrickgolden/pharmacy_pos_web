
export const calcAndSetChange = (
    totals: number, 
    totalPrice: number, 
    setChange: React.Dispatch<React.SetStateAction<{ remaining: number; change: number; }>> ) =>{

    if(totals < totalPrice) {
        // const remaining = totals ? (totalPrice - totals) : totals
        // setChange({change: 0.00, remaining})
        setChange({change: 0.00, remaining: (totalPrice - totals)})
    }else{
        setChange({change: (totals - totalPrice), remaining: 0.00})
    }
}


