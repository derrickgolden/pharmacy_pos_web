import { Link } from "react-router-dom";
import DataTableComponent from "../../sharedComponents/DataTableComponent";
import { GroupMedicineDetailsProps } from "./types";
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { shiftMedicineGroupApi } from "./apiCalls/shiftMedicineGroupApi";
import { Medicine } from "../types";

const GroupMedicineDetails: React.FC<GroupMedicineDetailsProps> = 
    ({medicineDetails, onHandleActionDetails, setShowDetails}) =>{
        
    const [search, setSearch] = useState('medicine_name');
    const [searchType, setSearchType] = useState('medicine_name');
    const [apidata, setApiState] = useState(medicineDetails.medicines)
    {/* data table column name */ }
    const [apicol, setApiCol] = useState([])
    const [rerendarApi, setRerendarApi] = useState(false)

    const [selectedGroup, setSelectedGroup ] = useState<string>()
    const [selectedMedicine, setSelectedMedicine ] = useState<Medicine>()

    const groupList = useSelector((state: RootState) => state.groupList)
console.log(medicineDetails);
    const columns = [
        {
            name: "Medicine Name",
            selector: (row: Medicine) => row.medicine_name,
            sortable: true
        },
        {
            name: "Stock Qty",
            selector: (row: Medicine) => row.stock_qty,
            sortable: true
        },
        {
            name: "Action",
            cell: (row: Medicine) => <>
            <button onClick={() => handleShow(row)} 
                className={`btn p-0 px-1 btn-outline-danger btn-sm`}  >
                    Shift group
            </button></>,
        },
    ]

    {/* data receve from store */ }
    useEffect(() => {
        setApiState(medicineDetails.medicines)
        // setApiCol(columns)
    }, [rerendarApi])

    const handleSearchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSearch(e.target.value);
        setSearchType(e.target.value); // Prop to set the search type in the parent component
    };

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (row: Medicine) =>{
        setSelectedMedicine(row)
        setShow(true);
    } 
    const handleShiftGroup = () =>{
        const [group ]= groupList.filter((group) => group.group_name === selectedGroup)
        
        shiftMedicineGroupApi(group.group_id, Number(selectedMedicine?.medicine_id), handleClose);
    }
    

    return(
        <div className="px-1 px-sm-5">
             <div className="container-fluid" >
                {/* <Breadcrumb title={title} brad={brad} /> */}
                {/* <Link to="#" ><button type="button" className="btn btn-outline-success active btn-sm ">All</button></Link> */}
                <div className="row my-3">
                    <div className="col-12">
                        <div className="card" style={{ borderTop: "2px solid #4723d9" }}>
                            <div className="card-header d-flex justify-content-between border-bottom pb-1">
                                <h4>{medicineDetails.group_name} Group</h4>
                                <select value={search} onChange={handleSearchChange}>
                                    <option value="medicine_name">Medicine Name</option>
                                    <option value="medicine_id">Medicine Id</option>
                                </select>
                            </div>
                            <div className="card-body">
                                <DataTableComponent search={ searchType }
                                     apidata={apidata} columns={columns} 
                                />
                            </div>
                        </div>

                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                            <Modal.Title>Shift {selectedMedicine?.medicine_name} to different Group</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="form-group mb-3 col-sm-12">
                                    <h6 className="p-2">Select a different group to shift the medicine to.</h6>
                                    <select onChange={(e) => setSelectedGroup(e.target.value)} value={selectedGroup}
                                    className="form-control" name="group_name" required>
                                        <option>-select group-</option>
                                        {groupList.map((group, i)=>(
                                            <option key={i} >{group.group_name}</option>
                                        ))}
                                    </select>
                                </div>                    
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleShiftGroup}>
                                Save Changes
                            </Button>
                            </Modal.Footer>
                        </Modal>

                        <div className="bg-white my-5 d-flex align-items-center justify-content-between" >
                            <button onClick={() => setShowDetails("list")}
                                type="button" className="btn btn-primary text-white">
                                    Back to Group List
                            </button>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GroupMedicineDetails;
