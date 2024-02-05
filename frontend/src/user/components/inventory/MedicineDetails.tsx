import { useDispatch } from "react-redux";
import DetailCard from "./DetailCard"
import { deleteMedicineApi } from "./apiCalls/deleteMedicineApi";
import { MedicineDetailsProps } from "./types";
import { setCallApi } from "../../../redux/callApi";
import Swal from "sweetalert2";

const MedicineDetails: React.FC<MedicineDetailsProps> = ({onHandleActionDetails, medicineDetails, setShowDetails}) =>{
    // console.log(medicineDetails);
    const dispatch = useDispatch();

    const handleMedicineDelete = (medicine_id: number, medicine_name: string) =>{
        Swal.fire({
            title: `Are you sure you want to delete ${medicine_name}?`,
            text: `All data will be lost including sales history related to the medicine.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMedicineApi({setShowDetails, medicine_id}).then((data) =>{
                    dispatch(setCallApi(true));
                });
            }
        });
    }
    
    return(
        <div className="px-2 px-md-5">
            {<DetailCard 
                key={1}
                data ={medicineDetails}/>}
            <div className="bg-white d-flex gap-4 align-items-center justify-content-between" >
                <button type="button" 
                onClick={() => handleMedicineDelete(medicineDetails?.medicine_id, medicineDetails.medicine_name)}
                className="btn btn-outline-danger">Delete Medicine</button>
                <button onClick={() => setShowDetails("list")}
                    type="button" className="btn btn-primary text-white">
                        Back to Medicine List
                </button>
            </div> 
        </div>
    )
}

export default MedicineDetails