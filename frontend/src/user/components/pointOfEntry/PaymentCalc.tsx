import React, { useState } from 'react';
import { FaDeleteLeft } from 'react-icons/fa6';

// import { PaymentCalcHandles } from './types';

// interface PosEntryProps{
//     PaymentCalcHandles: PaymentCalcHandles
// }
const PaymentCalc = ({ totalPrice, payMethods, PaymentCalcHandles, change }) => {
  const renderDigitButtons = (digits: number[]) => {
    return digits.map((digit) => (
      <button
        className='btn btn-outline-secondary btn-calc col-4 flex-grow-1 h-100 rounded-0'
        key={digit}
        onClick={() => PaymentCalcHandles.handleDigitClick(digit)}
      >
        {digit}
      </button>
    ));
  };

  return (
    <div className='col-6 h-100' >
      <div className='border' style={{height: "20vh"}}>
        {!payMethods.length && (
          <div className='d-flex flex-column justify-content-center text-center h-100'>
            <h1 className='text-primary'>{totalPrice} Ksh</h1>
            <p>Please select a payment method</p>
          </div>
        )
        }
        {payMethods.length && (
          <div className='d-flex justify-content-between align-items-center p-2 h-100'>
            <div>
              <h3 className=''>Remaining <span className='text-warning'>{change.remaining} Ksh</span></h3>
              <p>Total Due {totalPrice} Ksh</p>
            </div>
            <div>
              <h3>Change <span className='text-warning'>{change.change} Ksh</span></h3>
            </div>
          </div>
        )
        }
      </div>
      <div className='d-flex flex-grow-1 'style={{height: "60vh"}} >
        <div className='d-flex flex-column col-9 ' >
          <div className='d-flex flex-grow-1'>{renderDigitButtons([1, 2, 3])}</div>
          <div className='d-flex flex-grow-1'>{renderDigitButtons([4, 5, 6])}</div>
          <div className='d-flex flex-grow-1'>{renderDigitButtons([7, 8, 9])}</div>
          <div className='d-flex flex-grow-1'>
            <button
              className='btn btn-outline-secondary btn-calc col-4 rounded-0'
              onClick={PaymentCalcHandles?.handleQuantityIncByOne}
            >
              +
            </button>
            <button
                className='btn btn-outline-secondary btn-calc col-4 rounded-0'
                // onClick={() => PaymentCalcHandles?.handleDigitClick(Number('.'))}
            >
                .
            </button>
            {renderDigitButtons([0])}
          </div>
        </div>
        <div className='d-flex flex-column col-3'>
          {["+10", "+20", "+50"].map((figure, i) =>(
            <button key={i}
              onClick={PaymentCalcHandles?.handleSetToQuantityChange}
              className='btn btn-outline-secondary flex-grow-1 rounded-0'
            >
              {figure}
            </button>
          ))}
          <button
            onClick={PaymentCalcHandles?.handleDeleteDigit}
            className='btn btn-outline-secondary flex-grow-1'
          >
            <FaDeleteLeft />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCalc;
