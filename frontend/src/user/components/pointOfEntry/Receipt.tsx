import { useSelector } from "react-redux";
import { server_baseurl } from "../../../baseUrl";
import { getSessionStorage } from "../../controllers/getSessionStorage";
import OrdersCard from "./OrdersCard";
import { RootState } from "../../../redux/store";

const Receipt =({componentRef, saleRes, medicineDetails, orderDetails, totalPrice}) =>{
    const userPharm = getSessionStorage();
    const { localPharm: activePharmacy } = userPharm.localPharm;
    const { user } = userPharm.user;

    return(
        <div className="d-flex justify-content-center h-100 m-auto "
            style={{backgroundColor: "#a8a8a8"}}>
                <div ref={componentRef}
                className="col-11 my-2 bg-white p-2 receipt " >
                    <header className="d-flex flex-column text-center mb-2">
                        <div>
                            <img src={`${server_baseurl}/${activePharmacy?.logo_path}`} alt="logo" 
                            style={{width: "40px", height:"30px"}}/>
                            <span>{activePharmacy?.pharmacy_name}</span>
                        </div>
                        <span className=" col-10 m-auto">
                            {activePharmacy?.pharmacy_email}
                        </span>
                        <span className="border-bottom col-10 m-auto pb-2 mb-2">
                            {activePharmacy?.pharmacy_tel}
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
                        <div >
                            {Object.keys(saleRes.customerGave).map((key, i) =>(
                                <div key={i} className="d-flex pl-4 justify-content-between">
                                    <p>{key}</p>
                                    <p>{saleRes.customerGave[key]} Ksh</p>
                                </div>
                            ))}
                        </div>
                        <div className="d-flex col-8 pl-4 justify-content-between"
                        style={{ marginLeft: 'auto' }}>
                            <h4>CHANGE</h4>
                            <h4>{saleRes.change} Ksh</h4>
                        </div>
                        <div className="d-flex pl-4 justify-content-between">
                            {calculateVAT(totalPrice, 16).map((data, i) =>(
                                <p className='d-flex flex-column'
                                key = {i}> 
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
    )
}

export default Receipt;


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