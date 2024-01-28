import { useEffect, useState } from "react";
import ReportHeader, { SelectedDate } from "../components/reports/ReportHeader";
import { getSalesReportApi } from "./apiCalls/getSalesReport";
import { ResultItem } from "./calculations/totalSalesUnits";
import PayMethodTable from "../components/reports/PayMethodsTable";
import { thirtyDaysAgo } from "./SalesReport";
import { calcSalesPayMethodTotals } from "./calculations/calcSalesPayMethodsTotals";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const PaymentReport = () =>{
    const [salesPayMethods, setSalesPayMethods] = useState([])
    const [sortedSalesByDateSelect, setSortedSalesByDateSelect] = useState<ResultItem>({amtPerMethod: [],transPerMethod: [], sortedSales: []})

    useEffect(() =>{
        const url = "pay-method/get-report";
        const salesPayMethods = getSalesReportApi({url});
        salesPayMethods.then((data) =>{
            console.log(data);
            const sortedSalesByDate = calcSalesPayMethodTotals({data, date: {
                startDate:  thirtyDaysAgo, endDate: new Date(),
            }, keyType: "payment_methods" });
            console.log(sortedSalesByDate);

            setSortedSalesByDateSelect(sortedSalesByDate);
            setSalesPayMethods(data);
        })
    }, []);

    const handleRegenerateGraph = (date: SelectedDate) =>{
        if(date.endDate === null){
            date.endDate = new Date();
        }
        const sortedSalesByDate = calcSalesPayMethodTotals({data: salesPayMethods, date, keyType: "payment_methods" })
        setSortedSalesByDateSelect(sortedSalesByDate);
    }
    return(
        <div className='body2 bg-white pb-5' style={{paddingTop: "2rem"}}>
            <div className="upper-section bg-light mb-5 ">
                <ReportHeader 
                    handleRegenerateGraph = {handleRegenerateGraph}
                    salesData={sortedSalesByDateSelect?.sortedSales}
                    dataType = { "Payments" }
                />
                <div className='p-5 pt-0'>
                    <button className="btn btn-outline-primary col-12" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                        Show/Hide Payment Methods Graph
                    </button>
            </div>
                <div className="collapse" id="collapseExample">
                    <div className='d-lg-flex flex-row  gap-4 px-5 pb-4 col-12'>
                        <div>
                            <h4 className="col-12">Total amount(Ksh) per payment method</h4>
                            <LineChart width={400} height={300} data={sortedSalesByDateSelect?.amtPerMethod}>
                                <Line type="monotone" dataKey="Cash" stroke="#8884d8" />
                                <Line type="monotone" dataKey="Bank" stroke="#0004d8" />
                                <Line type="monotone" dataKey="Customer_account" stroke="#0004d8" />
                                <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
                                <XAxis dataKey="day" />
                                <YAxis />
                                <Tooltip />
                            </LineChart>
                        </div>
                        <div>
                        <h4>Total Transactions per payment method </h4>
                            <LineChart width={400} height={300} data={sortedSalesByDateSelect?.transPerMethod}>
                                <Line type="monotone" dataKey="Cash" stroke="#8884d8" />
                                <Line type="monotone" dataKey="Bank" stroke="#0004d8" />
                                <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
                                <XAxis dataKey="day" />
                                <YAxis />
                                <Tooltip />
                            </LineChart>
                        </div>
                    </div>
                </div>
            </div>
            <PayMethodTable salesData={sortedSalesByDateSelect?.sortedSales} />
        </div>
    )
}

export default PaymentReport;