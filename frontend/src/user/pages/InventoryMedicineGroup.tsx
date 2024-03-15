import { useState } from "react";
import PagesHeader from "../components/sharedComponents/PagesHeader";
import GroupList from "../components/inventory/medicineGroup/GroupList";
import GroupMedicineDetails from "../components/inventory/medicineGroup/GroupMedicineDetails";
import AddGroupForm from "../components/inventory/medicineGroup/AddGroupForm";
import { Group } from "../../redux/groupList";

const InventoryMedicineGroup = () =>{
    const [showDetails, setShowDetails] = useState("list");
    const [medicineDetails, setMedicineDetails] = useState<Group>();

    const handleActionDetails = (row: Group) =>{
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
            {showDetails === "details" && medicineDetails &&
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