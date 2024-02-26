import { useEffect, useRef } from "react";
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
    setEntryStep: React.Dispatch<React.SetStateAction<string>>;
    handleNewCustomerOrder: ({date}: {date: string}) => void;
    handleDeleteCustomerOrder: (e: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>, order: Order) => void;
    setOrdersList:  React.Dispatch<React.SetStateAction<Order[]>>
}

const ListOfOrders: React.FC<ListOfOrdersProps> = ({ordersList, activeCard, totalPrice, 
    setEntryStep, handleNewCustomerOrder, handleDeleteCustomerOrder, setOrdersList }) =>{

    const scrollRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        // Scroll to the bottom when the component renders
        if (scrollRef.current) {            
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [activeCard]);

    const handleChangeActiveOrder = (order: Order) =>{
        // setOrdersList((arr) => {
        //     return arr.map(prevOrder => ({ ...prevOrder, activeOrder: prevOrder.date === order.date }));
        // });
        // setEntryStep("ordersentry");
    }

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
                                    <tr key={i} onClick={() => handleChangeActiveOrder(order)}
                                    className="">
                                        <td>{order.date}</td>
                                        <td>{order.totalPrice} Ksh</td>
                                        <td>{order.status}</td>
                                        <td onClick={(e) => handleDeleteCustomerOrder(e, order)}>
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
        </div>
    )
}

export default ListOfOrders;