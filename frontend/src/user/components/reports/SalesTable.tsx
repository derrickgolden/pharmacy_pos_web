import React from 'react';
import DataTable from 'react-data-table-component';
import { PharmacyState } from '../../../redux/activePharmacy';

interface salesItemProps{
    medicine_id: number,
    medicine_name: string,
    sales_item_id: number,
    sub_total: number,
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
    salesData: salesProps[];
    activePharmacy: PharmacyState;
}

interface subColumnsProps {
    sub_total: string;
    id: string;
    medicine_id: number;
    medicine_name: string;
    sales_item_id: number;
    units_sold: number;
}
interface columnsProps {
    id: number;
    sale_id: number;
    sale_date: string;
    total_price: string;
    cashier: {
        cashier_f_name: string;
        cashier_l_name: string;
        cashier_id: number;
    };
    children: subColumnsProps[];
}[];

interface mappedDataProps{
    data: columnsProps;
}

const SalesTable: React.FC<salesDataProps> = ({ salesData, activePharmacy }) => {
    // Define columns for the main DataTable
  const columns = [
    { name: 'Sale ID', selector: (row: columnsProps) => row.sale_id, sortable: true },
    { name: 'Sale Date', selector: (row: columnsProps) => row.sale_date, sortable: true },
    { name: 'Total Price', selector: (row: columnsProps) => row.total_price, sortable: true },
    { name: 'Cashier Name', selector: (row: columnsProps) => row.cashier.cashier_f_name, sortable: true },
    { name: 'Cashier Id', selector: (row: columnsProps) => row.cashier.cashier_id, sortable: true },
  ];

  // Define columns for the nested DataTable (Sales Items)
  const subColumns = [
    { name: 'Sales Item ID', selector: (row: subColumnsProps) => row.sales_item_id, sortable: true },
    { name: 'Medicine ID', selector: (row: subColumnsProps) => row.medicine_id, sortable: true },
    { name: 'Medicine Name', selector: (row: subColumnsProps) => row.medicine_name, sortable: true },
    { name: 'Units Sold', selector: (row: subColumnsProps) => row.units_sold, sortable: true },
    { name: 'Sub Total', selector: (row: subColumnsProps) => row.sub_total, sortable: true },
  ];

  // Map the sales data to match the main DataTable structure
    const mappedData = salesData?.map((sale) => ({
        id: sale.sale_id,
        sale_id: sale.sale_id,
        sale_date: new Date(sale.sale_date).toLocaleString(),
        total_price: `Ksh. ${parseFloat(sale.total_price).toFixed(2)}`,
        cashier: sale.cashier,
        children: sale.sales_items.map((item) => ({
            ...item,
            sub_total: `Ksh. ${(item.sub_total).toFixed(2)}`,
        id: `${sale.sale_id}-${item.sales_item_id}`, // Unique identifier for each row
        })),
    }));

    // const nestData = mappedData?.children
    const ExpandedComponent = ({data}: mappedDataProps) => {
        return(
            <div className="card " style={{border: "1px solid #91becc", borderTop: "2px solid #3aaed1" }}>
                <div className="card-header d-flex justify-content-between border-bottom pb-1">
                    <h6>Details</h6>   
                </div>
                <div className="card-body pt-0">
                    {mappedData.length ? <div className="table-responsive ">
                    <DataTable
                        columns={subColumns}
                        data={data.children}
                        highlightOnHover
                    />
                </div>
                    :
                    <h1>No data to show</h1>
                    }  
                </div>
            </div>          
        );
    };

  return (
    <div className="container-fluid px-md-5" >
    <div className="row my-3">
        <div className="col-12">
            <div className="card" style={{ borderTop: "2px solid #4723d9" }}>
                <div className="card-header d-flex justify-content-between border-bottom pb-1">
                    <h4>Sales Data</h4>
                    {/* <select value={search} onChange={handleSearchChange}>
                        <option value="medicine_name">Medicine Name</option>
                        <option value="group_name">Medicine Group</option>
                        <option value="medicine_id">Medicine Id</option>
                    </select> */}
                </div>
                <div className="card-body">
                    {activePharmacy?.pharmacy? 
                        (<div className="table-responsive ">
                            <DataTable
                                columns={columns}
                                data={mappedData}
                                pagination
                                expandableRows
                                expandOnRowClicked
                                expandableRowsComponent={ExpandedComponent}
                                highlightOnHover
                                striped
                            />
                        </div>) :   (
                        <h1>Select a pharmacy first</h1>
                        )
                    }  
                </div>
            </div>
        </div>
    </div>
</div>
    
  );
};

export default SalesTable;

