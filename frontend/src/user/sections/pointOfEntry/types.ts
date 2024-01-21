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