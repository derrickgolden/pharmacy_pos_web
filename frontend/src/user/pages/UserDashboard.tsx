
import { RiMedicineBottleLine } from "react-icons/ri";
import { MdInventory } from "react-icons/md";
import { IoIosWarning } from "react-icons/io";

import TopSummaryCard from "../components/userDashboard/TopSummaryCard";
import BottomSummaryCard from "../components/userDashboard/BottomSummaryCard";
import { useEffect, useState } from "react";
import { getStockDetailsApi } from "./apiCalls/getStockDetails";
import { lowerDashboardData, upperDashboardData } from "./types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getMedicineGroupList } from "../components/inventory/medicineGroup/apiCalls/getMedicinGroupList";
import { getSalesReportApi } from "./apiCalls/getSalesReport";

// {title: "My Pharmacy", side_title_link: "#", side_title_link_caption: "Go to Configuration", left_totals: 18, left_totals_caption: "Total no of Suppliers", right_totals: 14, right_totals_caption: "Total no of Users", display_date_picker: false},
// {title: "Customers", side_title_link: "#", side_title_link_caption: "Go to Customer Page", left_totals: 298, left_totals_caption: "Total no of Customers", right_totals: 24, freq_bought_item:"Adalimumab", right_totals_caption: "Frequently bought item", display_date_picker: false}
const UserDashboard: React.FC = () =>{
    const dispatch = useDispatch();

    const pharmacyListDetails = useSelector((state: RootState) => state.pharmacyListDetailsList) 

    const [ lowerDashboardData, setLowerDashboardData ] = useState<lowerDashboardData[]>();
    const [ upperDashboardData, setUpperDashboardData] = useState<upperDashboardData[]>();
    
    useEffect(() =>{
        let lowStockMedicine: {}[] = [];
        let enoughStockMedicine: {}[] = [];
        let medicineAvailable: {}[] = [];
        let medicineShortage: {}[] = [];
        
        const stock = getStockDetailsApi()
        stock?.then(data =>{
            // console.log(data);
            data?.map((details: {containers: number, warning_limit: number, units_per_container: number}) =>{                
                if(details.containers <= details.warning_limit && details.containers > 0){
                    lowStockMedicine.push(details);
                }else if(details.containers > details.warning_limit){
                    enoughStockMedicine.push(details);
                }
                details.containers > 0 && details.units_per_container > 0 ? medicineAvailable.push(details) : medicineShortage.push(details);
            })
            
            setUpperDashboardData([
                {icon:<MdInventory size={32}/>, status: "Good", totals: enoughStockMedicine.length, caption: "Inventory Status", forCssDispaly: "success", footerCaption: "View detailed report", btnType: "inventory", data: enoughStockMedicine}, 
                {icon:<IoIosWarning size={32}/>, status: "Good", totals: lowStockMedicine.length, caption: "Low Stock Warning", forCssDispaly: "warning", footerCaption: "View detailed report", btnType: "warning", data: lowStockMedicine},
                {icon:<RiMedicineBottleLine size={32}/>, status: "Good", totals: medicineAvailable.length, caption: "Medicine Available", forCssDispaly: "info", footerCaption: "Visit inventory", btnType: "available", data: medicineAvailable},
                {icon:<IoIosWarning size={32}/>, status: "Good", totals: medicineShortage.length, caption: "Medicines Shortage", forCssDispaly: "danger", footerCaption: "Resolve now", btnType: "shortage", data: medicineShortage}
            ])
        })
        
        if(pharmacyListDetails.length > 0){
            const filterNull = false;
            const medicineList = getMedicineGroupList(filterNull);
            medicineList.then((data) =>{
                // console.log(data);
                const totalMedicine = data.length;
                let totalGroup = 0;
                data.map((details: {medicines: []}) =>{
                    totalGroup += details.medicines.length;
                })
                
                setLowerDashboardData(data => [
                    {title: "Inventory", side_title_link: "#", side_title_link_caption: "Go to Configuration", left_totals: totalMedicine, left_totals_caption: "Total no of Medicines", right_totals: totalGroup, right_totals_caption: "Medicine Groups", display_date_picker: false},
                ])
            })
            
            const salesReport = getSalesReportApi()
            salesReport.then((data) =>{

                const invoices = data.length;
                let medicinesSold = 0;
                data.map((details: {sales_items: []}) =>{
                    medicinesSold += details.sales_items.length
                })
                
                setLowerDashboardData((data = [])  => [...data,
                    {title: "Quick Report", side_title_link: "#", side_title_link_caption: "Date", left_totals: medicinesSold, left_totals_caption: "Qty of Medicines Solid", right_totals: invoices, right_totals_caption: "Invoices Generated", display_date_picker: true},
                ])

                dispatch(setSalesReportList(data));
            })
        }
    }, [pharmacyListDetails])
   
    return(
        <div  className='body2 bg-white' style={{paddingTop: "2rem"}}>
            <section className="upper-section px-5 bg-light py-5 mb-5">
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <h3 className="font-family-poppins font-weight-700 font-size-24 line-height-24 text-dark">
                            Dashboard
                        </h3>
                        <p className="font-family-poppins font-weight-400 font-size-14 line-height-21 text-dark">
                            A quick data overview of the inventory.
                        </p>
                    </div>
                    <div className="bg-white d-flex align-items-center" style={{ width: "192px", height: "46px" }}>
                        <select className="form-select flex-grow-1 font-family-poppins font-weight-400 font-size-15 line-height-22 text-dark"
                        aria-label="Download Report">
                            <option value="download">Download Report</option>
                            <option value="sales">Sales Report</option>
                            <option value="payments">Payments Report</option>
                            {/* Add more options as needed */}
                        </select>
                    </div>
                </div>
                <div className="d-flex flex-row flex-wrap justify-content-around">
                   {upperDashboardData? upperDashboardData.map((data, i) =>(
                    <TopSummaryCard 
                        key ={i}
                        data= {data}
                    />
                   )) : <h2>No data to show</h2> }
                </div>
            </section>
            <section className="lower-section bg-white d-flex flex-row flex-wrap justify-content-around">
                {lowerDashboardData? lowerDashboardData.map((data, i) =>(
                    <BottomSummaryCard 
                        key ={i}
                        data= {data}
                    />
                )) : <h2>No data to show</h2>}
            </section>
        </div>
    )
}

export default UserDashboard;