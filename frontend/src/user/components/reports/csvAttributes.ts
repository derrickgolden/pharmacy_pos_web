import Papa from 'papaparse';

import { salesProps } from "./SalesTable";

export const csvAttributes = (salesData: salesProps[]) =>{
    // Flatten the nested structure
    const flattenedData = salesData.map((sale) => {
        const { sale_id, sale_date, total_price, cashier, sales_items } = sale;
        return sales_items.map((item, i) => {
            if(i === 0){
                return{
                    sale_id,
                    sale_date: new Date(sale_date).toLocaleString(),
                    total_price,
                    cashier_name: `${cashier.cashier_f_name}`,
                    cashier_id: `${cashier.cashier_id}`,
                    ...item,
                }
            }else{
                return{
                    sale_id: null,
                    sale_date: null,
                    total_price: null,
                    ...item,
                }
            }
        });
    }).flat();

    // CSV headers
    const headers = [
        { label: 'Sale ID', key: 'sale_id' },
        { label: 'Sale Date', key: 'sale_date' },
        { label: 'Total Price', key: 'total_price' },
        { label: 'Cashier', key: 'cashier_name' },
        { label: 'Cashier ID', key: 'cashier_id' },
        { label: 'Sub Total', key: 'sub_total' },
        { label: 'Units Sold', key: 'units_sold' },
        { label: 'Medicine ID', key: 'medicine_id' },
        { label: 'Medicine Name', key: 'medicine_name' },
        { label: 'Sales Item ID', key: 'sales_item_id' },
    ];

    // CSV data
    const csvData = Papa.unparse({
        fields: headers.map((header) => header.key),
        data: flattenedData,
    });

    return {headers, csvData}
}
export const csvPaymentsAttributes = (salesData: salesProps[]) =>{
    // Flatten the nested structure
    const flattenedData = salesData.map((sale) => {
        const { sale_id, sale_date, total_price, payment_methods } = sale;
        return payment_methods.map((item, i) => {
            if(i === 0){
                return{
                    sale_id,
                    sale_date: new Date(sale_date).toLocaleString(),
                    total_price,
                    ...item,
                }
            }else{
                return{
                    sale_id: null,
                    sale_date: null,
                    total_price: null,
                    ...item,
                }
            }
        });
    }).flat();

    // CSV headers
    const headers = [
        { label: 'Sale ID', key: 'sale_id' },
        { label: 'Sale Date', key: 'sale_date' },
        { label: 'Total Price', key: 'total_price' },
        { label: 'Sales Item ID', key: 'sales_item_id' },
        { label: 'Payment Method', key: 'payment_method'},
        { label: 'Amount', key: 'amount'},
    ];

    // CSV data
    const csvData = Papa.unparse({
        fields: headers.map((header) => header.key),
        data: flattenedData,
    });

    return {headers, csvData}
}