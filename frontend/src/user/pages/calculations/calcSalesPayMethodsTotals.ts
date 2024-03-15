import { SelectedDate } from "../../components/reports/ReportHeader";
import { paymentProps } from "../types";

export interface PayMethodResult {
    amtPerMethod:{
        day: string;
        Cash: number; 
        Bank: number; 
        Customer_account: number;
    }[];
    transPerMethod:{
        day: string;
        Cash: number; 
        Bank: number; 
        Customer_account: number;
    }[];
    sortedPayments: paymentProps[]
}

interface calculateTotalSalesProps {
    data: paymentProps[], date: SelectedDate, keyType: "payment_methods" | "sales_items"
}

export function calcSalesPayMethodTotals({data, date, keyType}: calculateTotalSalesProps): PayMethodResult {
    const amtPerMethod = [];
    const transPerMethod = [];
    const sortedPayments: paymentProps[] = [];
    const startDate = new Date(date?.startDate);
    const endDate = new Date(date?.endDate);

    // Group sales data by date
    const salesByDate: Record<string, { 
        Cash: { amt: number; trans: number; }; 
        Bank: { amt: number; trans: number; }; 
        Customer_account: { amt: number; trans: number; } }> = data.reduce((acc, sale) => {
            
        const saleDate = new Date(sale.sale_date);

        if (saleDate >= startDate && saleDate <= endDate) {
            const saleDate = new Date(sale.sale_date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
            });
            
            if (!acc[saleDate]) {
                acc[saleDate] = { Cash: {amt: 0, trans: 0}, Bank: {amt: 0, trans: 0}, Customer_account: {amt: 0, trans: 0} };
            }

            // Update Cash and Bank for each sale
            sale.payment_methods.forEach((method) => {
                if(method.payment_method !== "Customer account"){
                    let accMethod: {
                        amt: number;
                        trans: number;
                    } = acc[saleDate][method.payment_method];
        
                    if (accMethod) {
                        accMethod.amt += method.amount;
                        accMethod.trans += 1;
                    }
                }
            });
            sortedPayments.push(sale)
        }
        return acc;
    }, {} as Record<string, {   Cash: { amt: number; trans: number; }; 
                                Bank: { amt: number; trans: number; }; 
                                Customer_account: { amt: number; trans: number; }  }>); // Explicitly type the accumulator

    // Convert grouped data to the desired format
    for (const date in salesByDate) {
        amtPerMethod.push({
            day: date,
            Cash: salesByDate[date].Cash.amt,
            Bank: salesByDate[date].Bank.amt,
            Customer_account: salesByDate[date].Customer_account.trans,
        });
        transPerMethod.push({
            day: date,
            Cash: salesByDate[date].Cash.trans,
            Bank: salesByDate[date].Bank.trans,
            Customer_account: salesByDate[date].Customer_account.trans,
        });
    }
    return {amtPerMethod, transPerMethod, sortedPayments};
}
