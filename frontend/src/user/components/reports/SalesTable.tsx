import React from 'react';
import DataTable from 'react-data-table-component';

interface salesItemProps{
    medicine_id: number,
    medicine_name: string,
    sales_item_id: number,
    sub_total: string,
    units_sold: number
}
interface salesProps{
    sale_id: number,
    sale_date: Date,
    sales_items: salesItemProps[],
    total_price: string,
}
interface salesDataProps{
    salesData: salesProps[]
}

const SalesTable: React.FC<salesDataProps> = ({ salesData }: salesDataProps) => {
    console.log(salesData);
    
    // Define columns for the main DataTable
  const columns = [
    { name: 'Sale ID', selector: (row: salesProps) => row.sale_id, sortable: true },
    { name: 'Sale Date', selector: (row: salesProps) => row.sale_date, sortable: true },
    { name: 'Total Price', selector: (row: salesProps) => row.total_price, sortable: true },
  ];

  // Define columns for the nested DataTable (Sales Items)
  const subColumns = [
    { name: 'Sales Item ID', selector: (row: salesItemProps) => row.sales_item_id, sortable: true },
    { name: 'Medicine ID', selector: (row: salesItemProps) => row.medicine_id, sortable: true },
    { name: 'Medicine Name', selector: (row: salesItemProps) => row.medicine_name, sortable: true },
    { name: 'Units Sold', selector: (row: salesItemProps) => row.units_sold, sortable: true },
    { name: 'Sub Total', selector: (row: salesItemProps) => row.sub_total, sortable: true },
  ];

  // Map the sales data to match the main DataTable structure
  const mappedData = salesData.map((sale) => ({
    id: sale.sale_id,
    sale_id: sale.sale_id,
    sale_date: new Date(sale.sale_date).toLocaleString(),
    total_price: `Ksh. ${parseFloat(sale.total_price).toFixed(2)}`,
    children: sale.sales_items.map((item) => ({
        ...item,
        sub_total: `Ksh. ${parseFloat(item.sub_total).toFixed(2)}`,
      id: `${sale.sale_id}-${item.sales_item_id}`, // Unique identifier for each row
    })),
}));

    // const nestData = mappedData?.children
    const ExpandedComponent = ({data}) => {
        console.log(data);
        return(
            <div className="card border border-primary" style={{ borderTop: "2px solid #4723d9" }}>
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
                    <h1>Loading data...</h1>
                    }  
                </div>
            </div>
           
        );
    };

  return (
    <div className="container-fluid px-5" >
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
                    {mappedData.length ? <div className="table-responsive ">
                        <DataTable
                        columns={columns}
                        data={mappedData}
                        pagination
                        expandableRows
                        expandableRowsComponent={ExpandedComponent}
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

export default SalesTable;

