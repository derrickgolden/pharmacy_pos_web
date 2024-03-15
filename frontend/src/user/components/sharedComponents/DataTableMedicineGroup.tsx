import { useState, useEffect, useRef } from 'react'
import DataTable from 'react-data-table-component'
import { DataTableMedicineGroupProps } from './types'

const DataTableMedicineGroup: React.FC<DataTableMedicineGroupProps> = ({ apidata, columns, search }) =>{
  const [data, setData] = useState(apidata)
  const [datafilter, setFilter] = useState('')
  const [datafinals, setFinals] = useState(apidata)

  // console.log(apidata)
  useEffect(() => {
    let result = data?.filter((val ) => {      
      if (search == 'group_name') {
        return val.group_name?.toLowerCase().match(datafilter?.toLowerCase())
      }
    })

    setFinals(result)
  }, [datafilter])

  useEffect(() => {
    setFinals(apidata)
    setData(apidata)
  }, [apidata])



  return (
    <>

      <div className="table-responsive ">
        <DataTable
          columns={columns}
          data={datafinals}
          pagination
          fixedHeader
          highlightOnHover
          responsive
          subHeader
          noHeader
          subHeaderComponent={
            <div className="row justify-content-start">
              <div className="col-12">
                <input type="text" placeholder={`search with ${search}`} className="form-control " 
                  value={datafilter} onChange={(e) => setFilter(e.target.value)} 
                />
              </div>
            </div>
           }
        />
      </div>
    </>
  )
}

export default DataTableMedicineGroup;
