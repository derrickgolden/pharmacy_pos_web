import { useEffect, useRef } from "react";
import { OrderDetail } from "../../pages/SalesEntry";
import { FaAngleLeft } from "react-icons/fa";
import OrderDisplay from "./OrderDisplay";
import { FaDeleteLeft } from "react-icons/fa6";
import { Order } from "./types";
import { Link } from "react-router-dom";

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
        setOrdersList((arr) => {
            return arr.map(prevOrder =>{
                if(prevOrder.date === order.date ){
                    setEntryStep(order.status);
                    return({ ...prevOrder, activeOrder: true });   
                }else{
                    return({ ...prevOrder, activeOrder: false });
                }
            }); 
        });
    };

    const handleEntryStep = () =>{
        ordersList.map(orders =>{
            if(orders.activeOrder){
                setEntryStep(orders.status);
            }
        })
    }

    const handleEditOrder = (order: OrderDetail) =>{
    }

    return(
        <div className="d-flex sales-entry-container" >
            <div className="col-12 col-sm-6 col-md-7 bg-light h-100 ">
                <div className="d-flex py-1 px-2 gap-4 bg-secondary" style={{height: "3rem"}}>
                    <button onClick={() => handleEntryStep()}
                        className="navbar-brand pl-2 btn btn-light">
                            &nbsp;<FaAngleLeft /> Back
                    </button>
                    <button onClick={() => handleNewCustomerOrder({date: new Date().toLocaleString()})}
                        className="navbar-brand pl-2 btn btn-warning">
                            New Order
                    </button>
                    <div className="input-group ">
                        <input type="text" className="form-control flex-grow-1" placeholder="Search orders..." aria-label="Recipient's username" aria-describedby="basic-addon2" />
                        <select className="input-group-text " aria-label="Filter Orders">
                            <option selected>All Orders</option>
                            <option value="1">In Progress</option>
                            <option value="2">Payment</option>
                            <option value="3">Receipt</option>
                        </select>
                    </div>
                        {/* <span className="input-group-text dropdown-toggle cursor-pointer" data-bs-toggle="dropdown" 
                        aria-expanded="false" role="button" id="basic-addon2">All Active Orders</span>
                        <ul className="dropdown-menu dropdown-menu-end">
                            <li><Link className="dropdown-item" to="#">All Active Orders</Link></li>
                            <li><Link className="dropdown-item" to="#">In Progress</Link></li>
                            <li><Link className="dropdown-item" to="#">Payment</Link></li>
                            <li><Link className="dropdown-item" to="#">Receipt</Link></li>
                        </ul> */}
                </div>
                <div className="bg-light table-responsive-lg orders-display">
                    <table className="table table-striped table-hover ">
                        <thead>
                            <tr className="table-dark">
                            <th scope="col">Date</th>
                            <th scope="col">Total</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {
                                ordersList.map((order, i) =>(
                                    <tr key={i} onClick={() => handleChangeActiveOrder(order)}
                                    className={`${i === 1? "table-active" : " "}`}>
                                        <td>{order.date}</td>
                                        <td>{order.totalPrice} Ksh</td>
                                        <td className="text-capitalize">{order.status}</td>
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
                <div className="d-flex d-sm-none fixed-bottom">
                    <button type="button" onClick={() => handleEntryStep()}
                    className="btn col-6 py-3 rounded-0 btn-warning">
                        <h5 className="mb-0"><b>Load Order</b></h5>
                    </button>
                    <button type="button" onClick={() => handleEntryStep()}
                    className="btn col-6 py-3 rounded-0 btn-info text-center">
                        <h5 className="mb-0"><b>Review</b></h5>
                    </button>
                </div>
            </div>
            <div className=" d-none d-sm-block col-6 col-md-5" >
                {ordersList.map((order, i) =>{
                    return order.activeOrder === true ?
                        <OrderDisplay key={i}
                            window = "orders"
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