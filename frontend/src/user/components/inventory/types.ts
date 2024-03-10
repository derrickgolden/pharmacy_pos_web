
export interface DetailCardProps{
    key: number,
    data: {
        title: string;
        side_title_link: string;
        side_title_link_caption: string;
        left_totals: number;
        left_totals_caption: string;
        right_totals: number;
        right_totals_caption: string;
        freq_bought_item?: string;
        display_date_picker: boolean;
    }
}

export interface Medicine {
    medicine_id: number;
    medicine_name: string;
    img_path: string | null;
    group_name: string;
    stock_qty: number;
    action: string;
    containers: number;
    warning_limit: number;
    last_stocked?: Date;
    open_container_units?: number;
    stock_id?: number;
    units_per_container: number;
  }

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

export interface MedicineDetailsProps{
    onHandleActionDetails:{}, 
    medicineDetails: Medicine,
    setShowDetails: (showlist: string) => void
}

export interface MedicineListProps {
    onHandleActionDetails: (row: Medicine) => void;
    onHandleUpdateStock: (row: Medicine) => void;
  }

  export interface Medicine {data:{
    medicine_id: number;
    medicine_code: string;
    medicine_name: string;
    stock_qty: number;
    instructions: string;
    side_effect: string;
    group_id: number;
    group_name: string;
    description: string;
}}
