import { useDispatch, useSelector } from "react-redux";
import MedicineSelectNavbar from "../../components/pointOfEntry/MedicineSelectNavbar";
import POEmedicineCard from "../../components/pointOfEntry/POEmedicineCard";
import { RootState } from "../../../redux/store";
import { useEffect, useState } from "react";
import { getMedicineGroupList } from "../../components/inventory/medicineGroup/apiCalls/getMedicinGroupList";
import { setGroupList } from "../../../redux/groupList";
import { OrderDetail } from "../../pages/SalesEntry";

interface InventorySelectProps {
    handleNewOrderSelect: (newOrder: OrderDetail) =>void
}
const InventorySelect: React.FC<InventorySelectProps> = ({handleNewOrderSelect}) =>{
    const [groupNames, setGroupNames] = useState([])
    const [showGroup, setShowGroup] = useState("All")
    const [searchMedicine, setSearchMedicine] = useState("")

    const dispatch = useDispatch()

    const medicineGroup = useSelector((state: RootState) => state.groupList)    

    useEffect(()=>{
        const groupNames: string[] = medicineGroup.map((group) => {
            return group.group_name
        })
        setGroupNames(groupNames);
    }, [medicineGroup])

    useEffect(()=>{
        const filterNull = true;
        const res = getMedicineGroupList(filterNull);
        res.then((data) =>{        
            dispatch(setGroupList(data));
        })
    },[medicineGroup.length === 0])
    
    return(
        <div className="col-12 px-0">
            <MedicineSelectNavbar 
                groupNames = {groupNames}
                setShowGroup = {setShowGroup}
                setSearchMedicine = {setSearchMedicine}
            />
            <div className="d-flex flex-wrap align-items-start inventory-select col-12"> 
            {
                medicineGroup.map((group, i) =>{
                    if(showGroup === "All" || showGroup === group.group_name){
                        return group.medicines.map((medicine, j)=>{
                            if(medicine.medicine_name?.toLowerCase().match(searchMedicine?.toLowerCase())){
                                const uniqueKey = i+j;
                                return <POEmedicineCard key={uniqueKey}
                                    medicineDetails ={medicine}
                                    handleNewOrderSelect = {handleNewOrderSelect}
                                />    
                            }
                        })
                    }
                })
            }
            </div>
        </div>
    )
}

export default InventorySelect;