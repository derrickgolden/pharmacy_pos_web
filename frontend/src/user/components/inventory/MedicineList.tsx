
import DataTableComponent from "../sharedComponents/DataTableComponent";
import { Link } from "react-router-dom";
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

const MedicineList: React.FC<MedicineListProps> = ({onHandleActionDetails}) =>{
    const [search, setSearch] = useState('medicine_name');
    const [searchType, setSearchType] = useState('medicine_name');
    const [selectData, setSelectData] = useState<Medicine>()

    // open modal
    const [open_update_modal, setOpen_update_modal] = useState({ render: true, modal_open: false })
    const [open_edit_modal, setOpen_edit_modal] = useState({ render: true, modal_open: false })

    const dispatch = useDispatch();
    const medicineList = useSelector((state: RootState) => state.medicineList);
    const apiCall = useSelector((state: RootState) => state.callApi);
    const activePharmacy = useSelector((state: RootState) => state.activePharmacy);

    const columns = [
        {
            name: "Medicine Id",
            selector: (row: Medicine) => row.medicine_id,
            sortable: true
        },
        {
            name: "Medicine Name",
            selector: (row: Medicine) => row.medicine_name,
            sortable: true
        },
        {
            name: "Group Name",
            selector: (row: Medicine) => row.group_name,
            sortable: true
        },
        {
            name: "Stock in Qty",
            selector: (row: Medicine) => row.stock_qty,
            sortable: true
        },
        {
            name: "Action",
            cell: (row: Medicine) => <>
                <button onClick={() => onHandleActionDetails(row)} className=" btn btn-info btn-sm ms-1"  >
                    <FontAwesomeIcon icon={faCircleInfo} />
                </button>
                <button onClick={() => {handleUpdateStock(row)}} className=" btn btn-primary btn-sm ms-1"  
                data-toggle="modal" data-target="#exampleModalCenter">
                    <MdBrowserUpdated  size={16}/>
                </button>
                <button onClick={() => {handleEditMedicine(row)}} className=" btn btn-secondary btn-sm ms-1"  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                </button>
            </>,
        },  
    ]

    {/* data receve from store */ }
    useEffect(() => {
        if(activePharmacy.pharmacy){
            const medicineList = getMedicineListApi(activePharmacy.pharmacy.pharmacy_id);
            medicineList.then(data =>{
                console.log(data);
                dispatch(setMedicineList(data));
            })
        }
    }, [medicineList.length === 0, apiCall, activePharmacy])

    const handleSearchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSearch(e.target.value);
        setSearchType(e.target.value); // Prop to set the search type in the parent component
    }; 

    const handleEditMedicine = (row: Medicine) =>{
        setOpen_edit_modal({ render: !open_update_modal.render, modal_open: true })
        setSelectData(row);
    };
    
    const handleUpdateStock = (row: Medicine) =>{
        setOpen_update_modal({ render: !open_update_modal.render, modal_open: true })
        setSelectData(row);
    };
    
    return(
        <div>
            <Update_stock_modal 
                select_data={selectData} open_update_data_modal={open_update_modal}
                btn_type = "update" 
            />
            <Edit_medicine_details 
                select_data={selectData} open_update_data_modal={open_edit_modal}
                btn_type = "edit" 
            />
            <div className="container-fluid px-md-5" >
                <div className="row my-3">
                    <div className="col-12">
                        <div className="card" style={{ borderTop: "2px solid #4723d9" }}>
                            <div className="card-header d-flex justify-content-between border-bottom pb-1">
                                <h4>Medicine List</h4>
                                <select value={search} onChange={handleSearchChange}>
                                    <option value="medicine_name">Medicine Name</option>
                                    <option value="group_name">Medicine Group</option>
                                    <option value="medicine_id">Medicine Id</option>
                                </select>
                            </div>
                            <div className="card-body">
                                {activePharmacy.pharmacy ? 
                                 <DataTableComponent search={ searchType }
                                      apidata={medicineList} columns={columns} 
                                 />
                                :
                                <h2>Select a pharmacy first</h2>
                                }  
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MedicineList;