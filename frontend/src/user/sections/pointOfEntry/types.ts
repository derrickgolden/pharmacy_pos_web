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
}