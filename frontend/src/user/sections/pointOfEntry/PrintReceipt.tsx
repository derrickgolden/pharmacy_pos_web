
import { useRef } from 'react';

import { FaAngleRight, FaPrint } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";

import { useReactToPrint } from 'react-to-print';

import Receipt from '../../components/pointOfEntry/Receipt';

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
        <div className="d-flex " >
            <div className="col-12 col-md-8 d-flex flex-column justify-content-between print-receipt"
            >
                <div className="px-4" >
                    <div className="py-3 text-center">
                        <h1 className="d-none d-sm-block">Payment Successful</h1>
                        <h3 className="d-sm-none">Payment Successful</h3>
                    </div>
                    <div>
                        <button onClick={handlePrint} className="col-12 border py-3"
                        style={{fontSize: "larger"}}>
                            <FaPrint /> Print Receipt
                        </button>
                    </div>
                    <div className="input-group my-3">
                        <input type="text" className="form-control py-2" placeholder="Enail: the receipt" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                        <div className="input-group-append ">
                            <span className="input-group-text py-2 rounded-end rounded-start-0" id="basic-addon2">Send <IoIosSend /></span>
                        </div>
                    </div>
                </div>
                <div className='d-md-none center-receipt'>
                    <Receipt 
                        componentRef={componentRef} 
                        saleRes ={saleRes} 
                        medicineDetails ={medicineDetails} 
                        orderDetails ={orderDetails} 
                        totalPrice ={totalPrice}
                    />
                </div>
                <div >
                    <button onClick={handleStartNewOrderClick}
                     className="btn btn-warning col-12 p-3 rounded-0 p-md-5 ">
                        <h2><FaAngleRight /> New Order</h2>
                    </button>
                </div>
            </div>
            <div className='d-none d-md-block col-4' style={{height: "82vh"}}>
                <Receipt 
                    componentRef={componentRef} 
                    saleRes ={saleRes} 
                    medicineDetails ={medicineDetails} 
                    orderDetails ={orderDetails} 
                    totalPrice ={totalPrice}
                />
            </div>
        </div>
    )
}

export default PrintReceipt;

