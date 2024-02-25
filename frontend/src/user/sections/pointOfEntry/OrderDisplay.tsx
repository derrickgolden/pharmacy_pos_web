import { useEffect, useRef, useState } from "react";
import { FaOpencart } from "react-icons/fa";
import OrdersCard from "../../components/pointOfEntry/OrdersCard";
import calculateVAT from "../../controllers/calculations/calculateVAT";
import { CommonSalesEntryProps } from "./types";

const OrderDisplay: React.FC<CommonSalesEntryProps> = ({ activeCard, handleEditOrder, orderDetails, totalPrice}) =>{
    const scrollRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        // Scroll to the bottom when the component renders
        if (scrollRef.current) {            
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [activeCard]);

    console.log(orderDetails);
    
    return(
        <div className=" position-relative col-12 px-0 mx-0 order-cards"  >
            {orderDetails.length === 0 ?(
                <div className="d-flex flex-column justify-content-center align-items-center 
                flex-grow-1 empty-cart" style={{height: "100%"}}>
                    <FaOpencart size={50} />
                    <h2>The Cart is Empty</h2>
                </div>
            ):(
                <div className="d-flex flex-column justify-content-between h-100 ">
                    <div ref={scrollRef}
                    className={`d-flex flex-column ordersCard border-3 flex-grow-1 px-1`}>
                        {orderDetails.map((order,i) =>(
                            <OrdersCard 
                                key={i}
                                order={order}
                                activeCard = {activeCard}
                                handleEditOrder = {handleEditOrder}
                                orderDetails ={orderDetails}
                            />
                        ))}
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
                </div>
            )}
                    
        </div>
    )
}

export default OrderDisplay;