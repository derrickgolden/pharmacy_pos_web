
import DataTableComponent from "../sharedComponents/DataTableComponent";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Medicine, MedicineListProps } from "./types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { getMedicineListApi } from "./apiCalls/getMedicineListApi";
import { setMedicineList } from "../../../redux/medicineList";
import Update_stock_modal from "./PopupModal"
import Edit_medicine_details from "./PopupModal"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faCheck, faCircleInfo, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { MdBrowserUpdated } from "react-icons/md";

export interface StockDetails{
    containers: number;
    last_stocked: Date;
    medicine_id: number;
    medicine_name: string;
    open_container_units: number;
    stock_id: number;
    units_per_container: number;
    warning_limit: number;
}
const SummaryDetails = () =>{
    const navigate = useNavigate()
    const { data, caption, color } = useLocation().state;
  console.log(data);

    const [search, setSearch] = useState('medicine_name');
    const [searchType, setSearchType] = useState('medicine_name');
    const [selectData, setSelectData] = useState<Medicine>();

    // open modal
    const [open_update_modal, setOpen_update_modal] = useState({ render: true, modal_open: false })

    const dispatch = useDispatch();
    const apiCall = useSelector((state: RootState) => state.callApi)

    const columns = [
        {
            name: "Medicine Id",
            selector: (row: StockDetails) => row.medicine_id,
            sortable: true
        },
        {
            name: "Medicine Name",
            selector: (row: StockDetails) => row.medicine_name,
            sortable: true
        },
        {
            name: "Stock in Qty",
            selector: (row: StockDetails) => row.containers,
            sortable: true
        },
        {
            name: "Open Stock",
            selector: (row: StockDetails) => row.open_container_units,
            sortable: true
        },
        {
            name: "Warining Limit",
            selector: (row: StockDetails) => row.warning_limit,
            sortable: true
        },
        {
            name: "Last Stocked",
            selector: (row: StockDetails) => new Date(row.last_stocked).toLocaleDateString(),
            sortable: true
        },
        {
            name: "Action",
            cell: (row: StockDetails) => <>
                {/* <button onClick={() => onHandleActionDetails(row)} className=" btn btn-info btn-sm ms-1"  >
                    <FontAwesomeIcon icon={faCircleInfo} />
                </button> */}
                <button onClick={() => {handleUpdateStock(row)}} className=" btn btn-primary btn-sm ms-1"  
                data-toggle="modal" data-target="#exampleModalCenter">
                    <MdBrowserUpdated  size={16}/>
                </button>
            </>,
        },  
    ]

    const onHandleActionDetails = (row: StockDetails) =>{

    }
    const handleSearchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSearch(e.target.value);
        setSearchType(e.target.value); // Prop to set the search type in the parent component
    }; 
    
    const handleUpdateStock = (row: Medicine) =>{
        setOpen_update_modal({ render: !open_update_modal.render, modal_open: true })
        setSelectData(row);
    };
    
    return(
        <div className='body2 bg-white pb-5' style={{paddingTop: "4rem"}}>
            <Update_stock_modal 
                select_data={selectData} open_update_data_modal={open_update_modal}
                btn_type = "update" 
            />
            <div className="container-fluid px-5" >
                <div className="pt-3">
                    <button type="button" onClick={() => navigate("/user/dashboard")}
                    className='btn btn-secondary'>Back to Dashboard</button>
                </div>
                <div className="row my-3">
                    <div className="col-12">
                        <div className="card" style={{ borderTop: "2px solid #4723d9" }}>
                            <div className="card-header d-flex justify-content-between border-bottom pb-1">
                                <h4 className={`${color} `}>{caption}</h4>
                                <select value={search} onChange={handleSearchChange}>
                                    <option value="medicine_name">Medicine Name</option>
                                    <option value="group_name">Medicine Group</option>
                                    <option value="medicine_id">Medicine Id</option>
                                </select>
                            </div>
                            <div className="card-body">
                                {data.length ? 
                                 <DataTableComponent search={ searchType }
                                      apidata={data} columns={columns} 
                                 />
                                :
                                <h1>Loading data...</h1>
                                }  
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pt-2">
                    <button type="button" onClick={() => navigate("/user/dashboard")}
                    className="btn btn-secondary">Back to Dashboard</button>
                </div>
            </div>
        </div>
    )
}

export default SummaryDetails;