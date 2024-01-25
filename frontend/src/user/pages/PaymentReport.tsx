import ReportHeader, { SelectedDate } from "../components/reports/ReportHeader";

const PaymentReport = () =>{

    const handleRegenerateGraph = (date: SelectedDate) =>{
        if(date.endDate === null){
            date.endDate = new Date();
        }
        // const sortedSalesByDate = calculateTotalSales(sales, date)
        // setSortedSalesByDateSelect(sortedSalesByDate);
    }
    return(
        <div className='body2 bg-white pb-5' style={{paddingTop: "2rem"}}>
            <div className="upper-section p-5 bg-light mb-5 ">
                <h1>Payment Report</h1>
                {/* <ReportHeader 
                    handleRegenerateGraph = {handleRegenerateGraph}
                    salesData={sortedSalesByDateSelect?.sortedSales}
                /> */}
            </div>
        </div>
    )
}

export default PaymentReport;