
import { RiMedicineBottleLine } from "react-icons/ri";
import { MdInventory } from "react-icons/md";
import { IoIosWarning } from "react-icons/io";

import TopSummaryCard from "../components/userDashboard/TopSummaryCard";
import BottomSummaryCard from "../components/userDashboard/BottomSummaryCard";
import { SetStateAction, useEffect, useState } from "react";
import { getStockDetailsApi } from "./apiCalls/getStockDetails";
import { details } from "./types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getMedicineGroupList } from "../components/inventory/medicineGroup/apiCalls/getMedicinGroupList";
import { getSalesReportApi } from "./apiCalls/getSalesReport";
import { setSalesReportList } from "../../redux/salesReport";
import { BottomSummaryCardProps } from "../components/userDashboard/types";

// {title: "My Pharmacy", side_title_link: "#", side_title_link_caption: "Go to Configuration", left_totals: 18, left_totals_caption: "Total no of Suppliers", right_totals: 14, right_totals_caption: "Total no of Users", display_date_picker: false},
// {title: "Customers", side_title_link: "#", side_title_link_caption: "Go to Customer Page", left_totals: 298, left_totals_caption: "Total no of Customers", right_totals: 24, freq_bought_item:"Adalimumab", right_totals_caption: "Frequently bought item", display_date_picker: false}
const UserDashboard: React.FC = () =>{
    const dispatch = useDispatch();

    const pharmacyListDetails = useSelector((state: RootState) => state.pharmacyListDetailsList);
    const activePharmacy = useSelector((state: RootState) => state.activePharmacy); 

    const [ lowerDashboardData, setLowerDashboardData ] = useState<SetStateAction<BottomSummaryCardProps>>();
    const [ upperDashboardData, setUpperDashboardData ] = useState<details[]>();
    
    useEffect(() =>{
        let lowStockMedicine: {}[] = [];
        let enoughStockMedicine: {}[] = [];
        let medicineAvailable: {}[] = [];
        let medicineShortage: {}[] = [];
        
        if(activePharmacy.pharmacy){
            const pharmacy_id = activePharmacy.pharmacy.pharmacy_id;
            
            const stock = getStockDetailsApi(pharmacy_id);
            stock?.then(data =>{
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
                const medicineList = getMedicineGroupList(filterNull, pharmacy_id);
                medicineList.then((data) =>{
                    let totalMedicine = 0;
                    const totalGroup = data.length;
                    data.map((details) =>{
                        if(details?.medicines[0].medicine_id !== null){
                            totalMedicine += details.medicines.length;
                        }
                    })
                    
                    setLowerDashboardData((data: BottomSummaryCardProps) => ({...data,
                        inventory: {title: "Inventory", side_title_link: "/user/inventory/medicine-group", side_title_link_caption: "Go to Configuration", left_totals: totalMedicine, left_totals_caption: "Total no of Medicines", right_totals: totalGroup, right_totals_caption: "Medicine Groups", display_date_picker: false}
                    }))
                })
                
                const url = "sales/get-sales"
                const salesReport = getSalesReportApi({url, pharmacy_id});
                salesReport.then((data) =>{

                    const invoices = data.length;
                    let medicinesSold = 0;
                    data.map((details: {sales_items: []}) =>{
                        medicinesSold += details.sales_items.length
                    })
                    
                    setLowerDashboardData((data: BottomSummaryCardProps )  => ({...data,
                        quickReport: {title: "Quick Report", side_title_link: "#", side_title_link_caption: "Date", left_totals: medicinesSold, left_totals_caption: "Qty of Medicines Solid", right_totals: invoices, right_totals_caption: "Invoices Generated", display_date_picker: true},
                    }))
                    dispatch(setSalesReportList(data));
                })
            }
        }
    }, [pharmacyListDetails, activePharmacy])
   
    return(
        <div  className='body2 bg-white' style={{paddingTop: "2rem"}}>
            <section className="upper-section px-0 px-sm-5 bg-light py-5 mb-5">
                <div className="d-flex justify-content-between align-items-center px-5 px-sm-0">
                    <div>
                        <h3 className="font-family-poppins font-weight-700 font-size-24 line-height-24 text-dark">
                            Dashboard
                        </h3>
                        <p className="font-family-poppins font-weight-400 font-size-14 line-height-21 text-dark">
                            A quick data overview of the inventory.
                        </p>
                    </div>
                    
                </div>
                <div className="d-flex flex-row flex-wrap justify-content-around">
                   {upperDashboardData? upperDashboardData.map((data, i) =>(
                    <TopSummaryCard 
                        key ={i}
                        data= {data}
                    />
                   )) : <h2>No data to display</h2> }
                </div>
            </section>
            <section className="lower-section bg-white d-flex flex-row flex-wrap justify-content-around">
                {lowerDashboardData? Object.values(lowerDashboardData).map((value, i) =>(
                    <BottomSummaryCard 
                        key ={i}
                        data= {value}
                    />
                )) : <h2>No data to display</h2>}
            </section>
        </div>
    )
}

export default UserDashboard;