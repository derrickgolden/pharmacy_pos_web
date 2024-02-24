import { useEffect, useRef } from "react";
import OrdersCard from "../../components/pointOfEntry/OrdersCard";
import calculateVAT from "../../controllers/calculations/calculateVAT";
import { OrderDetail } from "../../pages/SalesEntry";
import { CommonSalesEntryProps } from "./types";
import { FaAngleLeft } from "react-icons/fa";
import OrderDisplay from "./OrderDisplay";

interface ListOfOrdersProps extends CommonSalesEntryProps{
    ordersList: {
        [x: string]: {
            orderDetails: OrderDetail[];
            activeOrder: boolean;
            status: string;
        };
    };
    setEntryStep: (step: string) => void;
}

const ListOfOrders: React.FC<ListOfOrdersProps> = (
    {ordersList, activeCard, totalPrice, setEntryStep }) =>{
    const scrollRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        // Scroll to the bottom when the component renders
        if (scrollRef.current) {            
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [activeCard]);

    const handleEditOrder = (order: OrderDetail) =>{

    }
    return(
        <div className="d-flex">
            <div className="col-8">
                <div className="d-flex">
                    <button onClick={() => setEntryStep("ordersentry")}
                        className="navbar-brand pl-2 btn btn-outline-secondary">
                            &nbsp;<FaAngleLeft /> Back
                    </button>
                </div>
            </div>
            <div>
                {Object.keys(ordersList).map((key, i) =>{
                    return ordersList[key].activeOrder === true ?
                        <OrderDisplay 
                            newOrders = {ordersList[key].orderDetails}
                            activeCard = {activeCard}
                            handleEditOrder = {handleEditOrder}
                            orderDetails = {ordersList[key].orderDetails}
                            totalPrice = {totalPrice}
                        /> : null
                    })
                }
            </div>
            {/* <div className="d-flex flex-column justify-content-between h-100 col-4">
                    <div ref={scrollRef}
                    className={`d-flex flex-column ordersCard border-3 flex-grow-1 px-1`}>
                        {Object.keys(ordersList).map((key, i) =>{
                            return ordersList[key].activeOrder === true ?
                            <OrdersCard 
                                key={i}
                                order={ordersList[key].orderDetails[0]}
                                activeCard = {activeCard}
                                handleEditOrder = {handleEditOrder}
                                orderDetails ={ordersList[key].orderDetails}
                            /> : null
                        })}
                    </div>
                    <div className={`d-flex justify-content-end py-1 order-display col-12
                   justify-self-end w-100 bg-light`}>
                        <div>
                            <span className="text-poppins-bold">
                                Total: {totalPrice} Ksh
                            </span>
                            <p className="mb-0 text-poppins-regular"> 
                                Taxes: 
                                <span className="">&nbsp; {
                                    totalPrice ? 
                                        calculateVAT(totalPrice, 16)[1].value
                                    : null
                                } &nbsp;</span> 
                                 Ksh
                            </p>                          
                        </div>
                    </div>
                </div> */}
        </div>
    )
}

export default ListOfOrders;