
const OrdersCard: React.FC<{key: number, 
    order:{medicine_name: string, price: number}}> = ({ order, activeCard, handleEditOrder, orderDetails}) =>{

        if(orderDetails){
            var [orderDetail] = orderDetails?.filter(orderDetail =>
                orderDetail.medicine_id === order.medicine_id);
                // console.log(orderDetail);
        }
        
        
    return(
                <div onClick={() => handleEditOrder(order)}
                    className={`d-flex justify-content-between p-1 order-display
                    ${activeCard === order?.medicine_id? "order-display-bg" : ""}`}>
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
    )
}

export default OrdersCard