import InventorySelect from "./pointOfEntry/InventorySelect";
import OrderDisplay from "./pointOfEntry/OrderDisplay";
import PosEntry from "./pointOfEntry/POEcalc";
import ValidateOrders from "./pointOfEntry/ValidateOrders";
import PrintReceipt from "./pointOfEntry/PrintReceipt";
import ListOfOrders from "./pointOfEntry/LIstOfOrders";
import { MedicineDetails, Order } from "./pointOfEntry/types";

export {
    InventorySelect, OrderDisplay, PosEntry, ValidateOrders, PrintReceipt, ListOfOrders,
}

export type {
    MedicineDetails, Order
}