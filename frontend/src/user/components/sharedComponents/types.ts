import { Medicine } from "../inventory/types";

export interface DataTableComponentProps{
    apidata: Medicine[], 
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