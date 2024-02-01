const ChangeDisplay = ({payMethods, totalPrice, change}) =>{
    return(
        <div className='border' style={{height: "20vh"}}>
        {!payMethods.length && (
          <div className='d-flex flex-column justify-content-center text-center h-100'>
            <h1 className='text-primary'>{totalPrice} Ksh</h1>
            <p>Please select a payment method</p>
          </div>
        )
        }
        {payMethods.length !== 0 && (
          <div className='d-flex flex-column-reverse flex-sm-row justify-content-sm-between align-items-center p-2 h-100'>
            <div>
              <h3 className=''>Remaining <span className='text-warning'>{change.remaining} Ksh</span></h3>
              <p>Total Due {totalPrice} Ksh</p>
            </div>
            <div className="">
              <h3>Change <span className='text-warning'>{change.change} Ksh</span></h3>
            </div>
          </div>
        )
        }
      </div>
    )
}

export default ChangeDisplay;