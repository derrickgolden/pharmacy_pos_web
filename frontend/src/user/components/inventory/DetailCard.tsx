import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md"
import { Medicine } from "./types";
import { useEffect, useState } from "react";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";

export interface SalesProps{
    sub_total: number,
    units_sold: number,
    medicine_id: number,
    sales_item_id: number
}

const DetailCard: React.FC<{data: Medicine}> = ({data}) =>{
    const nodata = "No data"
    const [salesTotals, setSalesTotals ] = useState<{totalSales: number, totalUnits: number}>()
    const salesReport = useSelector((state: RootState) => state.salesReport);
    // console.log(salesReport);
    
    useEffect(() =>{
        let totalSales = 0;
        let totalUnits = 0
        salesReport.map((sales) =>{
            sales.sales_items.map((details) =>{
                if( details.medicine_id === data.medicine_id ){
                    totalSales += details.sub_total;
                    totalUnits += details.units_sold
                }
            })
        })
        setSalesTotals({totalSales, totalUnits})
    }, [data])
    return(
        <div>
            <div className="d-md-flex justify-content-between align-items-center">
                <div className="card border-secondary mb-5 col-md-5" >
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <p className="text-poppins-semibold mb-0">Medicine</p>
                    </div>

                    <div className="d-flex justify-content-between card-body text-dark ">
                        <div className="col-6 text-left">
                            <h5 className="card-title text-poppins-bold">{data.medicine_name}</h5>
                            <p className="card-text text-poppins">
                                Medicine name
                            </p>
                        </div>
                        <div className="col-6 text-left">
                            <h5 className="card-title text-poppins-bold">
                                {data.group_name}
                            </h5>
                            <p className="card-text text-poppins">Medicine Group</p>
                        </div>
                    </div>
                </div>
                <div className="card border-secondary mb-5 col-md-5" >
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <p className="text-poppins-semibold mb-0">Inventory in Qty</p>
                        <a className="text-poppins-regular" href="#">
                                Send Stock Request <MdOutlineKeyboardDoubleArrowRight />
                        </a>
                    </div>

                    <div className="d-flex justify-content-between card-body text-dark ">
                        <div className="col-3 text-left">
                            <h5 className="card-title text-poppins-bold">
                                {salesTotals?.totalUnits || nodata}    
                            </h5>
                            <p className="card-text text-poppins">
                                Lifetime Supply(units)
                            </p>
                        </div>
                        <div className="col-3 text-left">
                            <h5 className="card-title text-poppins-bold">
                                {salesTotals?.totalSales || nodata}
                            </h5>
                            <p className="card-text text-poppins">Lifetime Sales(Ksh)</p>
                        </div>
                        <div className="col-3 text-left">
                            <h5 className="card-title text-poppins-bold">
                                {data.stock_qty || nodata}
                            </h5>
                            <p className="card-text text-poppins">Stock Left</p>
                        </div>
                    </div>
                </div>
            </div>
                <div className="card border-secondary mb-5 " >
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <p className="text-poppins-semibold mb-0">How to Use</p>
                    </div>

                    <div className="d-flex justify-content-between card-body text-dark ">
                        
                        <div className="col-12 text-left">
                            <p className="card-text text-poppins">{data.instructions}</p>
                        </div>
                        
                    </div>
                </div>
                <div className="card border-secondary mb-5 " >
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <p className="text-poppins-semibold mb-0">Side Effects</p>
                    </div>

                    <div className="d-flex justify-content-between card-body text-dark ">
                        <div className=" text-left">
                            <p className="card-text text-poppins">
                                {data.side_effect}
                            </p>
                        </div>
                    </div>
                </div>
        </div>
    )
}

 export default DetailCard;