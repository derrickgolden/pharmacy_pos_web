import { useState } from "react";
import PagesHeader from "../components/sharedComponents/PagesHeader";
import GroupList from "../components/inventory/medicineGroup/GroupList";
import GroupMedicineDetails from "../components/inventory/medicineGroup/GroupMedicineDetails";
import { MedicineGroup } from "../components/inventory/medicineGroup/types";
import AddGroupForm from "../components/inventory/medicineGroup/AddGroupForm";

const InventoryMedicineGroup = () =>{
    const [showDetails, setShowDetails] = useState("list");
    const [medicineDetails, setMedicineDetails] = useState({
        medicine_totals: 0, action: "", group_name: "",
        medicine_list:[{
            medicine_id: 0, medicine_name: "", group_name: "", stock_qty: 0, action: ""
        }]
    });

    const handleActionDetails = (row: MedicineGroup) =>{
        setMedicineDetails(row);
        setShowDetails("details");
    }
  
    return(
        <div className='body2 bg-white pb-5' style={{paddingTop: "2rem"}}>
            <PagesHeader 
                setShowDetails ={setShowDetails}
                btnInfo = {{text: "Add New Group", navigate: "addgroup", details: "group"}}
            />
            {showDetails === "list" && 
                <GroupList 
                    onHandleActionDetails = {handleActionDetails}
                />
            }
            {showDetails === "details" && 
                <GroupMedicineDetails 
                    medicineDetails = {medicineDetails}
                    onHandleActionDetails = {handleActionDetails}
                    setShowDetails={setShowDetails}
                />
            }
            {showDetails === "addgroup" && 
                <AddGroupForm 
                    setShowDetails ={setShowDetails}
                />
            }
        </div>
    )
}

export default InventoryMedicineGroup;