import Swal from "sweetalert2";
import { calculateRemainingStock } from "../../controllers/calculations/calcRemainingStock";
import { OrderDetail } from "../SalesEntry";
import { Dispatch, SetStateAction } from "react";

export interface UpdateStockProps{
    medicine_id: number;
}

export const handleUpdatingStock = (medicine: OrderDetail, 
    setUpdateStock: Dispatch<SetStateAction<UpdateStockProps[]>>, 
    activeCard: number, newUnits: number, 
    useActiveCard = true) =>{

    const medicine2 = {
    unitsPerContainer: medicine.package_size,
    containersInStock: medicine.stock_qty,
    openContainerUnits: medicine.open_container_units,
    };

    const { error, msg, remainingContainers, remainingUnits  } = calculateRemainingStock( medicine2, newUnits);

    if(error){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: msg,
        });
    }else{
        setUpdateStock((stockArr) => {
            if(useActiveCard){
                const updatedStockArr = stockArr.map((item) => {
                    if (item.medicine_id === activeCard ) {
                        return {
                            medicine_id: activeCard,
                            remainingContainers,
                            remainingUnits
                        };
                    }else{
                        return item;
                    }
                }); 
                return updatedStockArr; 
            }else{
                if(!stockArr.some(stock => stock.medicine_id === medicine.medicine_id)){
                    return(
                        [...stockArr, 
                        {medicine_id: medicine.medicine_id, remainingContainers, remainingUnits}]
                    )
                }else{
                    return stockArr;
                };
            }
        })
    }
    const customer_note = medicine.customer_note || "";
    return { ...medicine, units: newUnits, sub_total: medicine.price * newUnits, customer_note };
}