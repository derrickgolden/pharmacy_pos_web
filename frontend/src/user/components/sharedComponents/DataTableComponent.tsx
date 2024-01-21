import { useState, useEffect, useRef } from 'react'
import DataTable from 'react-data-table-component'
import { Medicine } from '../inventory/types'
import { DataTableComponentProps } from './types'

const DataTableComponent: React.FC<DataTableComponentProps> = ({ apidata, columns, search }) =>{
  const [data, setData] = useState([])
  const [datafilter, setFilter] = useState('')
  const [datafinals, setFinals] = useState([])

  useEffect(() => {
    let result = data.filter((val: Medicine) => {
      console.log(val);
      
      if (search == 'medicine_name') {
        return val.medicine_name?.toLowerCase().match(datafilter?.toLowerCase())
      }
      else if (search == 'group_name') {
        return val.group_name?.toLowerCase().match(datafilter?.toLowerCase())
      }
      else if (search == 'medicine_id') {
        return val.medicine_id?.toString().match(datafilter?.toString())
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

export default DataTableComponent;
