import { useEffect, useRef, useState } from "react";
import { FaOpencart } from "react-icons/fa";
import OrdersCard from "../../components/pointOfEntry/OrdersCard";
import calculateVAT from "../../controllers/calculations/calculateVAT";
import { CommonSalesEntryProps } from "./types";

const OrderDisplay: React.FC<CommonSalesEntryProps> = ({ 
    activeCard, handleEditOrder, orderDetails, totalPrice, windowDisplay, setShowReview, handleEntryStep }) =>{
    const scrollRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        // Scroll to the bottom when the component renders
        if (scrollRef.current) {            
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [activeCard]);

    console.log(window.innerWidth);
    
    return(
        <div className={`${windowDisplay === "orders"? "h-100" : " "} position-relative col-12 px-0 mx-0 order-cards `}  >
            {orderDetails.length === 0 ?(
                <div className="d-flex flex-column justify-content-center align-items-center 
                flex-grow-1 empty-cart" style={{height: "100%"}}>
                    <FaOpencart size={50} />
                    <h2>The Cart is Empty</h2>
                </div>
            ):(
                <div className="d-flex flex-column justify-content-between "
                style={windowDisplay === "orders" && window.innerWidth <= 575 ? {height: "90%"}: {height: "100%"}}>
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
                    <div className={`d-flex justify-content-end p-1 order-display col-12
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

            {
                setShowReview && handleEntryStep ? (
                <div className="d-flex d-sm-none fixed-bottom">
                    <button type="button" onClick={() => handleEntryStep()}
                    className="btn col-6 py-3 rounded-0 btn-warning">
                        <h5 className="mb-0"><b>Load Order</b></h5>
                    </button>
                    <button type="button" onClick={() => setShowReview(false)}
                    className="btn col-6 py-3 rounded-0 btn-info text-center">
                        <h5 className="mb-0"><b>Order(s)</b></h5>
                    </button>
                </div>      
                ): null
            }
        </div>
    )
}


export default OrderDisplay;