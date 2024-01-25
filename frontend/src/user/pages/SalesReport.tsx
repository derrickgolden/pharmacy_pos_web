
import { useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { getSalesReportApi } from './apiCalls/getSalesReport';
import { useDispatch, useSelector } from 'react-redux';
import { setSalesReportList } from '../../redux/salesReport';
import { RootState } from '../../redux/store';
import { ResultItem, calculateTotalSales } from './calculations/totalSalesUnits';
import ReportHeader, { SelectedDate } from '../components/reports/ReportHeader';
import SalesTable from '../components/reports/SalesTable';

const thirtyDaysAgo = new Date();
thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

const SalesReport = () =>{
    const [sortedSalesByDateSelect, setSortedSalesByDateSelect] = useState<ResultItem>({accumulatedSales: [], sortedSales: []})
    const [selectedDate, setSelectedDate] = useState<SelectedDate>({
        startDate:  thirtyDaysAgo,
        endDate: new Date(),
    });

    const dispatch = useDispatch()

    const sales = useSelector((state: RootState) => state.salesReport)

    useEffect(() =>{
        const salesReport = getSalesReportApi()
        salesReport.then((data) =>{

            dispatch(setSalesReportList(data));
        })
    }, [sales.length === 0]);

    useEffect(() =>{
        const sortedSalesByDate = calculateTotalSales(sales, selectedDate)
        setSortedSalesByDateSelect(sortedSalesByDate);
        console.log(sales);
        
        console.log(sortedSalesByDate);
    }, [sales])

    const handleRegenerateGraph = (date: SelectedDate) =>{
        if(date.endDate === null){
            date.endDate = new Date();
        }
        const sortedSalesByDate = calculateTotalSales(sales, date)
        setSortedSalesByDateSelect(sortedSalesByDate);
    }

    return(
        <div className='body2 bg-white pb-5' style={{paddingTop: "2rem"}}>
        <div className="upper-section bg-light mb-5 ">
            <ReportHeader 
                handleRegenerateGraph = {handleRegenerateGraph}
                salesData={sortedSalesByDateSelect?.sortedSales}
            />
            <div className='d-lg-flex flex-row  gap-4 px-5'>
                <div>
                    <h4>Unit Solid and Clients Served per Day</h4>
                    <LineChart width={400} height={300} data={sortedSalesByDateSelect?.accumulatedSales}>
                        <Line type="monotone" dataKey="Clients" stroke="#8884d8" />
                        <Line type="monotone" dataKey="units_sold" stroke="#0004d8" />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                    </LineChart>
                </div>
                <div>
                <h4>Daily Total Sales(Ksh) </h4>
                    <LineChart width={400} height={300} data={sortedSalesByDateSelect?.accumulatedSales}>
                        <Line type="monotone" dataKey="day_sales" stroke="#8884d8" />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                    </LineChart>
                </div>
            </div>
        </div>
        <SalesTable salesData={sortedSalesByDateSelect?.sortedSales} />
        </div>
    )
}

export default SalesReport;


