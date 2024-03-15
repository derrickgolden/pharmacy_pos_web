import { Group } from "../../../redux/groupList";
import { MedicineDetails } from "../../sections";
import { Medicine } from "../inventory/types";

export interface DataTableComponentProps{
    apidata: Medicine[] | MedicineDetails[], 
    columns: ({
        name: string;
        selector: (row: Medicine) => number;
        sortable: boolean;
        cell?: undefined;
    } | {
        name: string;
        selector: (row: Medicine) => string ;
        sortable: boolean;
        cell?: undefined;
    } | {
        name: string;
        cell: (row: Medicine) => JSX.Element;
        selector?: undefined;
        sortable?: undefined;
    })[], search: string | number
  }
export interface DataTableMedicineGroupProps{
    apidata: Group[], 
    columns: ({
        name: string;
        selector: (row: Group) => number;
        sortable: boolean;
        cell?: undefined;
    } | {
        name: string;
        selector: (row: Group) => string ;
        sortable: boolean;
        cell?: undefined;
    } | {
        name: string;
        cell: (row: Group) => JSX.Element;
        selector?: undefined;
        sortable?: undefined;
    })[], 
    search: string | number
  }