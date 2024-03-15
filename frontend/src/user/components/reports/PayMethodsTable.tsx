import React from 'react';
import DataTable from 'react-data-table-component';
import { PharmacyState } from '../../../redux/activePharmacy';
import { mappedPaymentProps, paymentProps } from '../../pages/types';

interface salesItemProps{
    medicine_id: number,
    medicine_name: string,
    sales_item_id: number,
    sub_total: string,
    units_sold: number
}
export interface salesProps{
    sale_id: number,
    sale_date: Date,
    sales_items: salesItemProps[],
    total_price: string,
    cashier: {cashier_f_name: string, cashier_l_name: string, cashier_id: number},
}
export interface salesDataProps{
    paymentData: paymentProps[];
    activePharmacy : PharmacyState
}

const PayMethodTable: React.FC<salesDataProps> = ({ paymentData, activePharmacy }: salesDataProps) => {
    
    // Define columns for the main DataTable
    const columns = [
        { name: 'Sale ID', selector: (row: mappedPaymentProps) => row.sale_id, sortable: true },
        { name: 'Sale Date', selector: (row: mappedPaymentProps) => row.sale_date, sortable: true },
        { name: 'Payment Method', selector: (row: mappedPaymentProps) => {
            return row.payment_methods.map(method => method.payment_method).join(', ');
        }, sortable: true},
        { name: 'Amount', selector: (row: mappedPaymentProps) => {
            return row.payment_methods.map(method => method.amount).join(', ');
        }, sortable: true },
        { name: 'Total Price', selector: (row: mappedPaymentProps) => row.total_price, sortable: true },
    ];

  // Map the sales data to match the main DataTable structure
    const mappedData = paymentData?.map((sale) => ({
        id: sale.sale_id,
        sale_id: sale.sale_id,
        sale_date: new Date(sale.sale_date).toLocaleString(),
        total_price: `Ksh. ${parseFloat(sale.total_price).toFixed(2)}`,
        payment_methods: sale.payment_methods,
    }));

    return (
        <div className="container-fluid px-md-5" >
            <div className="row my-3">
                <div className="col-12">
                    <div className="card" style={{ borderTop: "2px solid #4723d9" }}>
                        <div className="card-header d-flex justify-content-between border-bottom pb-1">
                            <h4>Payment methods data</h4>
                            {/* <select value={search} onChange={handleSearchChange}>
                                <option value="medicine_name">Medicine Name</option>
                                <option value="group_name">Medicine Group</option>
                                <option value="medicine_id">Medicine Id</option>
                            </select> */}
                        </div>
                        <div className="card-body">
                            {activePharmacy?.pharmacy ? 
                            <div className="table-responsive ">
                                <DataTable
                                    columns={columns}
                                    data={mappedData}
                                    pagination
                                    highlightOnHover
                                    striped
                                />
                            </div>
                            :
                            <h1>Select a pharmacy first</h1>
                            }  
                        </div>
                    </div>
                </div>
            </div>
        </div>  
  );
};

export default PayMethodTable;

