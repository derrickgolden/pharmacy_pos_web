import { Group } from "../../../../redux/groupList";
import { Medicine } from "../types";

export interface MedicineGroup {
    medicine_totals: number;
    action: string;
    group_name: string;
    medicines: Medicine[]
  }

  export interface GroupMedicineDetailsProps{
    onHandleActionDetails:{}, 
    medicineDetails: Group,
    setShowDetails: (showlist: string) => void
}