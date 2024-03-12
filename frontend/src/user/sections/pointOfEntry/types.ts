import { OrderDetail } from "../../pages/SalesEntry";

export interface PoeCalcHandles {
    handleDigitClick: (digit: number) => void;
    handleQuantityIncByOne: () => void;
    handleSetToQuantityChange: () => void;
    handleSetToGiveDiscount: () => void;
    handleSetToEditPrice: () => void;
    handleDecreaseNcancelOrder: () => void;
    handleRefund: () => void;
    handleCustomerNote: () => void;
    handlePayment: () => void;
    handleCustomer: () => void;
  }

export interface CommonSalesEntryProps{
  activeCard: number; 
  totalPrice?: number;
  orderDetails: OrderDetail[];
  handleEditOrder: (order: OrderDetail) => void;
  windowDisplay?: string;
  setShowReview?: React.Dispatch<React.SetStateAction<boolean>>;
  handleEntryStep?: () => void
}

export interface MedicineDetails {
  price: number;
  img_path: string | null;
  stock_qty: number;
  pricing_id: number;
  medicine_id: number;
  side_effect: string;
  instructions: string;
  package_size: number;
  medicine_code: string;
  medicine_name: string;
  unit_of_measurement: string;
  open_container_units: number;
}

export interface Order{
  date: string;
  orderDetails: OrderDetail[];
  activeOrder: boolean;
  status: string;
  totalPrice: number;
}
