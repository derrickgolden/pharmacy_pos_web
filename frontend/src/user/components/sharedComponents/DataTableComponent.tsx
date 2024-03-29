import { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { DataTableComponentProps } from './types'
import { Medicine } from '../inventory/types'

const DataTableComponent: React.FC<DataTableComponentProps> = ({ apidata, columns, search }) =>{
  const [data, setData] = useState(apidata as Medicine[])
  const [datafilter, setFilter] = useState('')
  const [datafinals, setFinals] = useState(apidata as Medicine[])

  useEffect(() => {
    let result: Medicine[] = data?.filter((val ) => {      
      if (search == 'medicine_name') {
        return val.medicine_name?.toLowerCase().match(datafilter?.toLowerCase())
      }
      else if (search == 'group_name') {
        return val.group_name?.toLowerCase().match(datafilter?.toLowerCase())
      }
      else if (search == 'medicine_id') {
        return val.medicine_id?.toString().match(datafilter?.toString())
      }
    }) as Medicine[]

    setFinals(result)

  }, [datafilter])

  useEffect(() => {
    setFinals(apidata as Medicine[])
    setData(apidata as Medicine[])
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
