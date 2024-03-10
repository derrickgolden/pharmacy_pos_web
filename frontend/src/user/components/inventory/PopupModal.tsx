import { useState, useEffect } from 'react'
import { Modal, Button } from "react-bootstrap";
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux';

import { Medicine } from "./types";
import { updateStock } from './apiCalls/updateStock';
import { editMedicineDetailsApi } from './apiCalls/editMedicineDetails';
import { setCallApi } from '../../../redux/callApi';

interface update_modal_data_props{
    medicine_id: number;
    medicine_name: string;
    group_name: string;
    stock_qty: number;
}
interface Add_data_modal_Props {
    select_data: Medicine;
    open_update_data_modal: {modal_open: boolean};
    btn_type: string
}

const Add_data_modal: React.FC<Add_data_modal_Props> = ({ select_data, open_update_data_modal, btn_type }) =>{
    const dispatch = useDispatch()

    const [btnType, setBtnType] = useState<string> (btn_type)

    // open modal in status
    const [add_data_modal_Show, set_update_data_modal_Show] = useState(false);
    
    const [update_modal_data, setUpdate_modal_data] = useState<update_modal_data_props>()

    const [newStock, setNewStock] = useState<number>()
    const [editDetails, setEditDetails] = useState(
        {medicine_name: select_data?.medicine_name, warning_limit: select_data?.warning_limit}
    )
        
    const stock = select_data?.stock_qty || select_data?.containers || 0;
    const [totalStock, setTotalStock] = useState<number>(stock);
 
    useEffect(() => {

        setUpdate_modal_data({
            group_name: select_data?.group_name, 
            medicine_id: select_data?.medicine_id,
            medicine_name: select_data?.medicine_name,
            stock_qty: stock
        })

        setNewStock(undefined);
        
        // setTotalStock(stock);
        // setEditDetails({medicine_name: select_data.medicine_name, warning_limit: select_data.warning_limit })
        setBtnType(btn_type)
    }, [select_data])

    // status model show and filter select value 
    useEffect(() => {
        set_update_data_modal_Show(open_update_data_modal.modal_open)
    }, [open_update_data_modal])

    const handleClose = () => {
        set_update_data_modal_Show(false);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const total_stock = Number(value) + Number(stock);
        setNewStock(Number(value));
        setTotalStock(total_stock);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const id = e.target.id;
        const value = e.target.value;
        setEditDetails((data) => ({...data, [id]: value}));
    }

    const handleUpdateStock = () =>{
        Swal.fire({
            title: `Update Stock to ${totalStock}?`,
            text: `New stock filled today: ${newStock}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, update!"
        }).then((result) => {
            if (result.isConfirmed) {
                updateStock(
                    {handleClose, totalStock, medicine_id: select_data.medicine_id}
                    ).then((data) =>{
                    data?.success ? dispatch(setCallApi(false)): null;
                })
                setNewStock(undefined);
            }
        });    
    }
    
    const handleEditDetails = () =>{
        if(!editDetails) return;

        Swal.fire({
            title: `Confirm details change`,
            text: `Medicine name: ${editDetails?.medicine_name}. Warning limit: ${editDetails?.warning_limit}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, edit!"
        }).then((result) => {
            if (result.isConfirmed) {
                const editRes = editMedicineDetailsApi({
                    handleClose, ...editDetails, medicine_id: select_data.medicine_id
                }).then((data) =>{
                    data?.success ? dispatch(setCallApi(false)): null;
                })
            };
        });    
    }

    return (
        <>
            {/* status update modal */}
            <Modal  show={add_data_modal_Show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Stock</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                <div className="table-responsive my-3">
                    <table className="table align-middle border table-striped table-hover">
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>Detail</th>
                        </tr>
                    </thead>
                    <tbody>

                        {update_modal_data? Object.entries(update_modal_data).map((data, i) => {
                        return (<tr key={i}>
                            <td>{data[0]}</td>
                            <td>{data[1]}</td>
                        </tr>)
                        }): null }

                    </tbody>
                    </table>
                </div>
                {
                btnType === "update" && (
                <div>
                    <div className="input-group mb-3">
                        <input onChange={handleChange} name='stock' value={newStock} type="number" className="form-control" placeholder="New Stock" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                    <span>New Total Stock: <b>{totalStock}</b> (containers)</span>
                </div>
                )
                }{
                btnType === "edit" && (
                    <div>
                        <label htmlFor="medicine_name">Edit medicine name:</label>
                        <div className="input-group mb-3">
                            <input type="text" onChange={handleInputChange} value={editDetails.medicine_name}
                            className="form-control" id="medicine_name" aria-describedby="medicine-name" />
                        </div>
                        <label htmlFor="warning_limit">Change warning limit:</label>
                        <div className="input-group mb-3">
                            <input type="number" onChange={handleInputChange} value={editDetails.warning_limit}
                            className="form-control" id="warning_limit" aria-describedby="warning-limit" />
                        </div>
                    </div>
                )
                }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {btnType === "update" && (
                        <Button variant="primary" className="btn btn-sm" onClick={handleUpdateStock}>
                            Update Stock
                        </Button>
                    )}
                    {btnType === "edit" && (
                        <Button variant="primary" className="btn btn-sm" onClick={handleEditDetails}>
                            Edit Details
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>

        </>
    )
}

export default Add_data_modal;