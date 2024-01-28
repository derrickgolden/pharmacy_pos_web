import Swal from "sweetalert2";
import { calculateRemainingStock } from "../../controllers/calculations/calcRemainingStock";
import { OrderDetail } from "../SalesEntry";

export const handleUpdatingStock = (medicine: OrderDetail, 
    setUpdateStock: (value: React.SetStateAction<{medicine_id:number}[]>) => void, 
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
                console.log("if: ", stockArr);
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
                console.log("else: ", stockArr)
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
    return { ...medicine, units: newUnits, sub_total: medicine.price * newUnits };
}