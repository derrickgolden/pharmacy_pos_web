import { FaRegNoteSticky } from "react-icons/fa6";
import { CommonSalesEntryProps } from "../../sections/pointOfEntry/types";
import { OrderDetail } from "../../pages/SalesEntry";

interface OrdersCardProps extends CommonSalesEntryProps{
    order: OrderDetail;
}

const OrdersCard: React.FC< OrdersCardProps > = (
    { order, activeCard, handleEditOrder, orderDetails}) =>{

    // Initialize orderDetail as undefined
    let orderDetail: OrderDetail | undefined;

    // Check if orderDetails is defined and filter orderDetail accordingly
    if (orderDetails) {
        orderDetail = orderDetails.find(orderDetail =>
            orderDetail.medicine_id === order.medicine_id
        );
    }      
        
    return(
        <div onClick={() => handleEditOrder(order)}
            className={`p-2 order-display
            ${activeCard === order?.medicine_id? "order-display-bg" : ""}`}>
                <div 
                    className={`d-flex justify-content-between `}>
                        <div className="col-10">
                        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            <span className="text-poppins-semibold" style={{ whiteSpace: 'nowrap',  }}>
                                {order.medicine_name}
                            </span>
                        </div>
                            <p className="mb-0"> 
                                <span className="text-poppins-semibold">{
                                    orderDetail?.units
                                } &nbsp;</span> 
                                Units * {order.price} Ksh / Unit
                            </p>                          
                        </div>
                        <div className="text-poppins-semibold col-2 pl-3">
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