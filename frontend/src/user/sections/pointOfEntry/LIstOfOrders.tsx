import { useEffect, useRef } from "react";
import OrdersCard from "../../components/pointOfEntry/OrdersCard";
import calculateVAT from "../../controllers/calculations/calculateVAT";
import { OrderDetail } from "../../pages/SalesEntry";
import { FaAngleLeft } from "react-icons/fa";
import OrderDisplay from "./OrderDisplay";
import { FaDeleteLeft } from "react-icons/fa6";

export interface Order{
    date: string;
    orderDetails: OrderDetail[];
    activeOrder: boolean;
    status: string;
    totalPrice: number;
}
interface ListOfOrdersProps {
    ordersList: Order[];
    activeCard: number; 
    totalPrice: number;
    setEntryStep: (step: string) => void;
    handleNewCustomerOrder: ({date}: {date: string}) => void;
    handleDeleteCustomerOrder: (order: Order) => void;
}

const ListOfOrders: React.FC<ListOfOrdersProps> = (
    {ordersList, activeCard, totalPrice, setEntryStep, handleNewCustomerOrder, handleDeleteCustomerOrder }) =>{

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
                <div className="d-flex py-1 px-2" style={{height: "3rem"}}>
                    <button onClick={() => setEntryStep("ordersentry")}
                        className="navbar-brand pl-2 btn btn-outline-secondary">
                            &nbsp;<FaAngleLeft /> Back
                    </button>
                    <button onClick={() => handleNewCustomerOrder({date: new Date().toLocaleString()})}
                        className="navbar-brand pl-2 btn btn-warning">
                            New Order
                    </button>
                </div>
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Total</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                ordersList.map((order, i) =>(
                                    <tr key={i} className="">
                                        <td>{order.date}</td>
                                        <td>{order.totalPrice} Ksh</td>
                                        <td>{order.status}</td>
                                        <td onClick={() => handleDeleteCustomerOrder(order)}>
                                        <button className=" btn btn-secondary btn-sm ms-1"  >
                                            <FaDeleteLeft />
                                        </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                {ordersList.map((order, i) =>{
                    return order.activeOrder === true ?
                        <OrderDisplay key={i}
                            activeCard = {activeCard}
                            handleEditOrder = {handleEditOrder}
                            orderDetails = {order.orderDetails}
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