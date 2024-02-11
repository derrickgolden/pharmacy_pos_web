import { useDispatch, useSelector } from "react-redux";
import MedicineSelectNavbar from "../../components/pointOfEntry/MedicineSelectNavbar";
import POEmedicineCard from "../../components/pointOfEntry/POEmedicineCard";
import { RootState } from "../../../redux/store";
import { useEffect, useState } from "react";
import { getMedicineGroupList } from "../../components/inventory/medicineGroup/apiCalls/getMedicinGroupList";
import { setGroupList } from "../../../redux/groupList";
import { OrderDetail } from "../../pages/SalesEntry";
import OrdersCard from "../../components/pointOfEntry/OrdersCard";
import { FaOpencart } from "react-icons/fa";

interface InventorySelectProps {
    handleNewOrderSelect: (newOrder: OrderDetail) =>void
}
const InventorySelect: React.FC<InventorySelectProps> = ({
    handleNewOrderSelect, handleEditOrder, orderDetails, handlePayment, setShowInventoryOrders }) =>{
    const [groupNames, setGroupNames] = useState([])
    const [showGroup, setShowGroup] = useState("All")
    const [searchMedicine, setSearchMedicine] = useState("")

    const dispatch = useDispatch()
    const medicineGroup = useSelector((state: RootState) => state.groupList);
    const activePharmacy = useSelector((state: RootState) => state.activePharmacy);   

    useEffect(()=>{
        const groupNames: string[] = medicineGroup.map((group) => {
            return group.group_name
        })
        setGroupNames(groupNames);
    }, [medicineGroup])

    useEffect(()=>{
        if(activePharmacy.pharmacy){
            const filterNull = true;
            const pharmacy_id = activePharmacy.pharmacy?.pharmacy_id;
            const res = getMedicineGroupList(filterNull, pharmacy_id);
            res.then((data) =>{        
                dispatch(setGroupList(data));
            })
        }
    },[medicineGroup.length === 0])
    // console.log(orderDetails)
    
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
            <div className="fixed-bottom d-md-none bg-light">
                {
                    orderDetails.length > 0 ? (
                        <OrdersCard 
                            key={0}
                            order = {orderDetails[orderDetails.length - 1]} 
                            activeCard={0}
                            handleEditOrder= {handleEditOrder} 
                            orderDetails = {orderDetails}
                        />
                    ) : (
                        <div className="text-center">
                            <FaOpencart  />
                            <h3>The Cart is Empty</h3>
                        </div>
                    )
                }
                <div className="d-flex">
                    <button type="button" onClick={() => handlePayment()}
                    className="btn col-6 p- m-0 rounded-0 btn-warning">
                        <h5><b>Pay</b></h5>
                        {orderDetails.reduce((acc: number, detail) => acc + detail.sub_total, 0)} Ksh
                    </button>
                    <button type="button" onClick={() => setShowInventoryOrders("orders")}
                    className="btn col-6 p- m-0 rounded-0 
                    btn-info text-center">
                        <h5><b>Review</b></h5>
                        <span className="mb-0">{orderDetails.length} Items</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default InventorySelect;