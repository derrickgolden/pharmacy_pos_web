export interface MedicineGroup {
    medicine_totals: number;
    action: string;
    group_name: string;
    medicines: {
        medicine_id: number;
        medicine_name: string;
        group_name: string;
        stock_qty: number;
        action: string;
    }[]
  }

  export interface GroupMedicineDetailsProps{
    onHandleActionDetails:{}, 
    medicineDetails: MedicineGroup,
    setShowDetails: (showlist: string) => void
}