
import { RxAvatar } from 'react-icons/rx';
import { LiaFileInvoiceSolid } from "react-icons/lia";

const CustomerInvoice = () =>{
    return(
        <div className="d-none d-md-flex flex-column col-3" >
            <button className='btn border flex-row-1 py-3'>
                <h5><RxAvatar /> Customer</h5>
            </button>
            <button className='btn border flex-row-1 py-3'>
                <h5><LiaFileInvoiceSolid /> Invoice</h5>
            </button>
            <div className='flex-grow-1'
            style={{backgroundColor: "#e6e9e9"}}>

            </div>
        </div>
    )
}

export default CustomerInvoice;