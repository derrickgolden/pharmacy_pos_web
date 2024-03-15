import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMedicineGroupList } from "./apiCalls/getMedicinGroupList";
import { useDispatch, useSelector } from "react-redux";
import { Group, setGroupList } from "../../../../redux/groupList";
import { RootState } from "../../../../redux/store";
import DataTableMedicineGroup from "../../sharedComponents/DataTableMedicineGroup";

interface  GroupListProps{
    onHandleActionDetails: (row: Group) => void
  }

const GroupList: React.FC<GroupListProps> = ({onHandleActionDetails}) =>{
    const [search, setSearch] = useState('group_name');
    const [searchType, setSearchType] = useState('group_name');
    
    const dispatch = useDispatch();
    const groupList = useSelector((state: RootState) => state.groupList);
    const activePharmacy = useSelector((state: RootState) => state.activePharmacy);

    const columns = [
        {
            name: "Group Name",
            selector: (row: Group) => row.group_name,
            sortable: true
        },
        {
            name: "No of Medicine",
            selector: (row: Group) => {
                if(row.medicines.length === 1 && row.medicines[0].medicine_id === null){
                    return 0;
                }
                return row.medicines.length;
            },
            sortable: true
        },
        {
            name: "Action",
            cell: (row: Group) => <>
            <button onClick={() => onHandleActionDetails(row)} 
                disabled= {row.medicines[0].medicine_id === null ? true : false}
                className={`btn p-0 px-1 btn-primary btn-sm`}  >
                    View in Detail
                </button></>,
        },
    ]

    useEffect(() =>{
        const filterNull = false
        const pharmacy_id = activePharmacy.pharmacy?.pharmacy_id;
        if(pharmacy_id){
            const apiRes = getMedicineGroupList(filterNull, pharmacy_id);
            apiRes.then(data =>{
                dispatch(setGroupList(data))
            })   
        }
    }, [groupList.length === 0, activePharmacy]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSearch(e.target.value);
        setSearchType(e.target.value); // Prop to set the search type in the parent component
      };

    return(
        <div className="px-md-5 pb-5">
            <div className="container-fluid" >
                {/* <Breadcrumb title={title} brad={brad} /> */}
                <Link to="#" ><button type="button" className="btn btn-outline-success active btn-sm ">All</button></Link>
                <div className="row my-3">
                    <div className="col-12">
                        <div className="card" style={{ borderTop: "2px solid #4723d9" }}>
                            <div className="card-header d-flex justify-content-between border-bottom pb-1">
                                <h4>Medicine Groups</h4>
                                {/* <select value={search} onChange={handleSearchChange}>
                                    <option value="medicine_name">Medicine Name</option>
                                    <option value="group_name">Medicine Group</option>
                                    <option value="medicine_id">Medicine Id</option>
                                </select> */}
                            </div>
                            <div className="card-body">
                                {activePharmacy.pharmacy ?  
                                    <DataTableMedicineGroup search={ searchType }
                                        apidata={groupList} columns={columns} 
                                    />  :
                                    <h2>Select a pharmacy first.</h2>
                                }           
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GroupList;