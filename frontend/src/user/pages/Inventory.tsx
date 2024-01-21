import { MdInventory } from "react-icons/md"
import TopSummaryCard from "../components/userDashboard/TopSummaryCard"
import { RiMedicineBottleLine } from "react-icons/ri"
import { IoIosWarning } from "react-icons/io"

import { IoAddOutline } from "react-icons/io5";
import { Outlet } from "react-router-dom";

const upperDashboardData = [
    {icon:<MdInventory size={32}/>, status: "Good", totals: 123, caption: "Inventory Status", forCssDispaly: "success", footerCaption: "View detailed report"}, 
    {icon:<RiMedicineBottleLine size={32}/>, status: "Good", totals: 123, caption: "Medicine Available", forCssDispaly: "info", footerCaption: "Visit inventory"},
    {icon:<IoIosWarning size={32}/>, status: "Good", totals: 123, caption: "Medicines Shortage", forCssDispaly: "danger", footerCaption: "Resolve now"},
]

const Inventory = () =>{
    return(
        <div className='body2 bg-white ' style={{paddingTop: "2rem"}}>
        <section className="upper-section bg-light py-5 mb-5">
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <h3 className="font-family-poppins font-weight-700 font-size-24 line-height-24 text-dark">
                            Inventory
                        </h3>
                        <p className="font-family-poppins font-weight-400 font-size-14 line-height-21 text-dark">
                            A quick data overview of the inventory.
                        </p>
                    </div>
                    <div className="bg-white d-flex align-items-center" style={{ width: "192px", height: "46px" }}>
                        <button type="button" className="btn btn-danger text-white">
                            <IoAddOutline /> Add New Item
                        </button>
                    </div>
                </div>
                <div className="d-flex flex-row gap-5">
                   {upperDashboardData.map((data, i) =>(
                    <TopSummaryCard 
                        key ={i}
                        data= {data}/>
                   ))}
                </div>
            </section>
        <Outlet />
        </div>
    )
}

export default Inventory;