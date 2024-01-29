import { FaRegNoteSticky } from "react-icons/fa6";

const OrdersCard: React.FC<{key: number, 
    order:{medicine_name: string, price: number}}> = ({ order, activeCard, handleEditOrder, orderDetails}) =>{

        // console.log(orderDetails)
        if(orderDetails){
            var [orderDetail] = orderDetails?.filter(orderDetail =>
                orderDetail.medicine_id === order.medicine_id);
        }       
        
    return(
        <div onClick={() => handleEditOrder(order)}
            className={`p-2 order-display
            ${activeCard === order?.medicine_id? "order-display-bg" : ""}`}>
                <div 
                    className={`d-flex justify-content-between `}>
                        <div>
                            <span className="text-poppins-semibold">
                                {order.medicine_name} 
                            </span>
                            <p className="mb-0"> 
                                <span className="text-poppins-semibold">{
                                    orderDetail?.units
                                } &nbsp;</span> 
                                Units * {order.price} Ksh / Unit
                            </p>                          
                        </div>
                        <div className="text-poppins-semibold">
                            Ksh.{orderDetail?.sub_total}
                        </div>
                </div>
                {
                    orderDetail?.customer_note && (
                        <p className="mb-0 px-2 text-poppins " style={{backgroundColor: "#d6f7f7"}}>
                            <FaRegNoteSticky /> {orderDetail.customer_note}
                        </p>
                    )
                }
        </div>
    )
}

export default OrdersCard