import { Medicine } from "../inventory/types";

export interface DataTableComponentProps{
    apidata:{
      medicine_id: number;
      medicine_name: string;
      group_name: string;
      stock_qty: number;
      action: string;
    }[], 
    columns: ({
        name: string;
        selector: (row: Medicine) => number;
        sortable: boolean;
        cell?: undefined;
    } | {
        name: string;
        selector: (row: Medicine) => string;
        sortable: boolean;
        cell?: undefined;
    } | {
        name: string;
        cell: (row: Medicine) => JSX.Element;
        selector?: undefined;
        sortable?: undefined;
    })[], search: string | number
  }