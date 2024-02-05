import React from 'react';
import DataTable from 'react-data-table-component';

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
    salesData: salesProps[]
}

const PayMethodTable: React.FC<salesDataProps> = ({ salesData }: salesDataProps) => {
    console.log(salesData);
    
    // Define columns for the main DataTable
  const columns = [
    { name: 'Sale ID', selector: (row: salesProps) => row.sale_id, sortable: true },
    { name: 'Sale Date', selector: (row: salesProps) => row.sale_date, sortable: true },
    { name: 'Payment Method', selector: (row: salesProps) => {
        return(
            <div className='d-flex flex-column'>{
                row.payment_methods.map((method, i: number) =>(
                    <span key={i}>{method.payment_method}</span>
                ))
            }
            </div>
        )
    }, sortable: true},
    { name: 'Amount', selector: (row: salesProps) => {
        return(
            <div className='d-flex flex-column'>{
                row.payment_methods.map((method, i: number) =>(
                    <span key={i}>{method.amount}</span>
                ))
            }
            </div>
        )
    }, sortable: true },
    { name: 'Total Price', selector: (row: salesProps) => row.total_price, sortable: true },
  ];

  // Map the sales data to match the main DataTable structure
    const mappedData = salesData?.map((sale) => ({
        id: sale.sale_id,
        sale_id: sale.sale_id,
        sale_date: new Date(sale.sale_date).toLocaleString(),
        total_price: `Ksh. ${parseFloat(sale.total_price).toFixed(2)}`,
        payment_methods: sale.payment_methods.map((item) => ({
            ...item,
            id: `${sale.sale_id}-${item.sales_item_id}`, // Unique identifier for each row
        })),
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
                    {mappedData.length ? <div className="table-responsive ">
                        <DataTable
                        columns={columns}
                        data={mappedData}
                        pagination
                        highlightOnHover
                        striped
                        />
                    </div>
                    :
                    <h1>Loading data...</h1>
                    }  
                </div>
            </div>
        </div>
    </div>
</div>
    
  );
};

export default PayMethodTable;

