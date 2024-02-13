
import { useState } from "react";

import MedicineDetails from "../components/inventory/MedicineDetails";
import MedicineList from "../components/inventory/MedicineList";
import PagesHeader from "../components/sharedComponents/PagesHeader";
import { Medicine } from "../components/inventory/types";
import AddMedicineForm from "../components/inventory/AddMedicineForm";
import Swal from "sweetalert2";

const InventoryMedicineList = () =>{
    const [showDetails, setShowDetails] = useState("list")
    const [medicineDetails, setMedicineDetails] = useState({
        medicine_id: 0, medicine_name: "", group_name: "", stock_qty: 0, action: ""
    })

    const handleActionDetails = (row: Medicine) =>{
        setMedicineDetails(row);
        setShowDetails("details");
    }
   
    const handleUpdateStock = (row: Medicine) =>{
        
        Swal.fire({
            title: `Do you want to update stock for ${row.medicine_name}?`,
            inputLabel: "New stock number(will be added to previous stock)",
            input: "number",
            showCancelButton: true,
            confirmButtonText: "Save",
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              Swal.fire("Saved!", "", "success");
            } else if (result.isDenied) {
              Swal.fire("Changes are not saved", "", "info");
            }
          });
    }

    return(
        <div className='body2 bg-white pb-5' style={{paddingTop: "2rem"}}>
            <PagesHeader 
                setShowDetails ={setShowDetails}
                btnInfo ={{text: "Add New Medicine", navigate: "addmedicine", details: "medicine"}}
            />
            {showDetails === "list" && 
                <MedicineList
                    onHandleActionDetails = {handleActionDetails} 
                    onHandleUpdateStock = {handleUpdateStock}
                />}
            {showDetails === "details" && 
                <MedicineDetails
                    onHandleActionDetails = {handleActionDetails}
                    medicineDetails = {medicineDetails}
                    setShowDetails = {setShowDetails}
                 />}
            {showDetails === "addmedicine" && 
                <AddMedicineForm
                    setShowDetails = {setShowDetails}
                 />}
        </div>
    )
}

export default InventoryMedicineList;