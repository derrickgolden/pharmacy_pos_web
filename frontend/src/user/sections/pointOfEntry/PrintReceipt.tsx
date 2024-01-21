
import { useRef } from 'react';

import { FaAngleRight, FaPrint } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";

import { useReactToPrint } from 'react-to-print';

import OrdersCard from "../../components/pointOfEntry/OrdersCard";
import { server_baseurl } from '../../../baseUrl';

const PrintReceipt = (
    {orderDetails, handleStartNewOrderClick, medicineDetails, totalPrice, saleRes, payMethods}) =>{
    const componentRef = useRef<HTMLDivElement | null>(null);

    const user = JSON.parse(sessionStorage.getItem("user"));
    const pharm = JSON.parse(sessionStorage.getItem("activepharmacy"))

    console.log(user);
    

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

    return(
        <div className="d-flex ">
            <div className="col-8 d-flex flex-column justify-content-between"
            style={{height: "80vh"}}>
                <div className="px-4">
                    <div className="py-3">
                        <h1>Payment Successful</h1>
                    </div>
                    <div>
                        <button onClick={handlePrint} className="col-12 border py-3"
                        style={{fontSize: "larger"}}>
                            <FaPrint /> Print Receipt
                        </button>
                    </div>
                    <div className="input-group my-3">
                        <input type="text" className="form-control py-2" placeholder="Enail: the receipt" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                        <div className="input-group-append">
                            <span className="input-group-text py-2" id="basic-addon2">Send <IoIosSend /></span>
                        </div>
                    </div>
                </div>
                <div>
                    <button onClick={handleStartNewOrderClick}
                     className="btn btn-warning col-12 p-5">
                        <h2><FaAngleRight /> New Order</h2>
                    </button>
                </div>
            </div>
            <div className="d-flex justify-content-center m-auto col-4"
            style={{backgroundColor: "#a8a8a8"}}>
                <div ref={componentRef}
                className="col-11 my-2 bg-white p-2 receipt" >
                    <header className="d-flex flex-column text-center mb-2">
                        <div>
                            <img src={`${server_baseurl}/${pharm.logo_path}`} alt="logo" 
                            style={{width: "40px", height:"30px"}}/>
                            <span>{pharm.pharmacy_name}</span>
                        </div>
                        <span className=" col-10 m-auto">
                            {pharm.pharmacy_email}
                        </span>
                        <span className="border-bottom col-10 m-auto pb-2 mb-2">
                            {pharm.pharmacy_tel}
                        </span>
                        <span>Served by {user.last_name} {user.first_name}</span>
                        <span><b>{saleRes.sale_id}</b></span>
                    </header>
                    <div className={`d-flex flex-column border-3 flex-grow-1`}>
                            {medicineDetails.map((order, i) =>(
                                <OrdersCard 
                                    key={i}
                                    order={order}
                                    orderDetails = {orderDetails } 
                                />
                            ))}
                        <div className="d-flex col-8 py-4 pl-4 justify-content-between"
                        style={{ marginLeft: 'auto' }}>
                            <h3>TOTAL</h3>
                            <h3>{totalPrice} Ksh</h3>
                        </div>
                        <div className="d-flex pl-4 justify-content-between">
                            <p>{payMethods[0]}</p>
                            <p>{saleRes.customerGave} Ksh</p>
                        </div>
                        <div className="d-flex col-8 pl-4 justify-content-between"
                        style={{ marginLeft: 'auto' }}>
                            <h4>CHANGE</h4>
                            <h4>{saleRes.change} Ksh</h4>
                        </div>
                        <div className="d-flex pl-4 justify-content-between">
                            {calculateVAT(totalPrice, 16).map((data, i) =>(
                                <p className='d-flex flex-column'> 
                                    <span>{data.label}</span> <span>{data.value}</span>
                                </p>
                            ))}
                        </div>
                        <div className=" text-center py-4 pl-4 col-12 ">
                            <p>Order {saleRes.sale_id}</p>
                            <p className='d-flex justify-content-center gap-4 col-12'> 
                                <span>{new Date(saleRes.sale_date).toDateString()}</span> 
                                <span>{new Date(saleRes.sale_date).toLocaleTimeString()}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PrintReceipt;

interface VatDetail {
    label: string;
    value: number;
  }
function calculateVAT(amount: number, vatPercentage: number): VatDetail[] {
    const vat = +(amount * vatPercentage / 100).toFixed(2);
    const exVAT = +(amount - vat).toFixed(2);
    const total = amount;
  
    return [
        { label: 'VAT%', value: vatPercentage },
        { label: 'VAT', value: vat },
        { label: 'ExVAT', value: exVAT },
        { label: 'Total', value: total },
      ];
  }
