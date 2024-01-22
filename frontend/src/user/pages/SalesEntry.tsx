import { useEffect, useState } from "react";
import InventorySelect from "../sections/pointOfEntry/InventorySelect";
import OrderDisplay from "../sections/pointOfEntry/OrderDisplay";
import PosEntry from "../sections/pointOfEntry/POEcalc";
import MedicineSelectNavbar from "../components/pointOfEntry/MedicineSelectNavbar";
import { calculateTotalPayments } from "../controllers/calculations/calculateTotalPayment";
import ValidateOrderNavbar from "../components/pointOfEntry/ValidateOrderNavbar";
import ValidateOrders from "../sections/pointOfEntry/ValidateOrders";
import PrintReceipt from "../sections/pointOfEntry/PrintReceipt";
import { regiterSalesApi } from "./apiCalls/registerSales";
import { useNavigate } from "react-router-dom";
import { calculateRemainingStock } from "../controllers/calculations/calcRemainingStock";
import Swal from "sweetalert2";

const SalesEntry = () =>{

  interface OrderDetail {
    medicine_id: number;
    units: number;
    sub_total: number;
  }
    const [medicineDetails, setSelectedMedicine] = useState([])
    const [activeCard, setActiveCard] = useState(0)
    const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [entryStep, setEntryStep] = useState("ordersentry");
    const [payMethods, setPayMethods] = useState([])
    const [saleRes, setSaleRes] = useState({});
    const [updateStock, setUpdateStock] = useState<{}[]>([]);
    const [isDigitClicked, setIsDigitClicked] = useState(false)

    const navigate = useNavigate()

    useEffect(() =>{
      const newTotalPrice = orderDetails.reduce((total, item) => {
        return total + Number(item.sub_total);
      }, 0);
        setTotalPrice(newTotalPrice)
    },[orderDetails])

    const user = JSON.parse(sessionStorage.getItem("user"));
    const pharm = JSON.parse(sessionStorage.getItem("activepharmacy"))

    const PoeCalcHandles = {
        handleDigitClick: (digit: number) => {
          // console.log(`Digit ${digit} clicked`);
          setOrderDetails((arr) => {
              return arr.map((orderDetail) => {
                if (orderDetail.medicine_id === activeCard && orderDetail.units > 0) {
                  let newUnits;
                  if(isDigitClicked){
                    const newUnitsAsString = orderDetail.units.toString() + digit.toString();
                    newUnits = parseInt(newUnitsAsString, 10);
                  }else{
                    newUnits = digit;
                    setIsDigitClicked(true);
                  }
                  const price = orderDetail.sub_total/orderDetail.units
                      return { ...orderDetail, units: newUnits, sub_total: newUnits * price };
                } else {
                  return orderDetail
                }
              })
            })
        },
      
        handleQuantityIncByOne: () => {
          // Your logic for handling quantity increment by one
          console.log('Quantity incremented by one');
        },
      
        handleSetToQuantityChange: () => {
          // Your logic for setting to quantity change
          console.log('Setting to Quantity Change');
        },
      
        handleSetToGiveDiscount: () => {
          // Your logic for setting to give discount
          console.log('Setting to Give Discount');
        },
      
        handleSetToEditPrice: () => {
          // Your logic for setting to edit price
          console.log('Setting to Edit Price');
        },
      
        handleDecreaseNcancelOrder: () => {
          // Your logic for setting to Decrement and cancel order
          console.log(orderDetails);
          
          setOrderDetails((arr) => {
            const [orderDetail] = arr.filter(orderDetail => orderDetail?.medicine_id === activeCard);

            if(orderDetail?.units > 0){
              return arr.map((orderDetail) => {
                if (orderDetail.medicine_id === activeCard && orderDetail.units > 0) {
                  const unitsString = orderDetail.units.toString();

                  const newUnits = Math.max(parseInt(unitsString.slice(0, -1), 10) || 0, 0);

                  const price = orderDetail.sub_total/orderDetail.units
                      return { ...orderDetail, units: newUnits, sub_total: newUnits * price };
                } else {
                  return orderDetail
                }
              })
            }else{
              setSelectedMedicine((arr) =>(arr.filter(medicine => medicine.medicine_id !== activeCard)))
              setActiveCard(medicineDetails[(medicineDetails.length-2)]?.medicine_id);
              const newarr = arr.filter(orderDetail => orderDetail?.medicine_id !== activeCard);
              
              return arr.filter(orderDetail => orderDetail?.medicine_id !== activeCard);
            }
          });
          
        },
      
        handleRefund: () => {
          // Your logic for handling refund
          console.log('Handling Refund');
        },
      
        handleCustomerNote: () => {
          // Your logic for handling customer note
          console.log('Handling Customer Note');
        },
      
        handlePayment: () => {
          if(totalPrice > 0){
            setEntryStep("validateorder")
          }
        },

        handleCustomer: () => {
            console.log("Handling Customer");           
        }
      };
            
    const handleNewOrderSelect = (
          newOrder: { medicine_id: number, medicine_name: string, price: number, package_size: number, stock_qty: number }
        ) => {
          const medicine2 = {
            name: 'ExampleMedicine',
            pricePerUnit: 5,
            unitsPerContainer: newOrder.package_size,
            containersInStock: newOrder.stock_qty,
            openContainerUnits: 0,
          };

          setSelectedMedicine((arr) => {
            if (arr.some(medicine => medicine.medicine_id === newOrder.medicine_id)) {
              return arr;
            } else {
              return [...arr, newOrder];
            }
          });
          setOrderDetails((arr) => {
            if (arr.some(medicine => medicine.medicine_id === newOrder.medicine_id)) {
              const newOrders = arr.map(medicine => {
                if (medicine.medicine_id === newOrder.medicine_id) {
                  const newUnits = medicine.units + 1;
                 
                  const { error, msg, remainingContainers, remainingUnits  } = calculateRemainingStock( medicine2, newUnits);

                  if(error){
                    Swal.fire({
                      icon: "error",
                      title: "Oops...",
                      text: msg,
                    });
                  }else{
                    setUpdateStock((stockArr) => [...stockArr, 
                      {medicine_id: newOrder.medicine_id, remainingContainers, remainingUnits}])
                    }
                    return { ...medicine, units: newUnits, sub_total: newOrder.price * newUnits };
                } else {
                  return medicine;
                }
              });
              return newOrders;
            }else{
              // calculateTotalPayments(arr)
              const { error, msg, remainingContainers, remainingUnits } = calculateRemainingStock( medicine2, 1 );
              if(error){
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: msg,
                });
              }else{
                setUpdateStock((stockArr) => [...stockArr, 
                  {medicine_id: newOrder.medicine_id, remainingContainers, remainingUnits}])
                }
                return [...arr, { medicine_id: newOrder.medicine_id, units: 1, sub_total: newOrder.price }];
            }
          });
          setActiveCard(newOrder.medicine_id);
          isDigitClicked? setIsDigitClicked(false) :null;
      };
      
    const handleEditOrder = (order) =>{
        setActiveCard(order.medicine_id)

    }
    const handleVilidateClick = (customerGave: number, change: {}) =>{
      const moneyTrans = {...change, customerGave}
      
      regiterSalesApi({orderDetails, totalPrice, moneyTrans, updateStock, setEntryStep, setSaleRes})
    }
    const handleStartNewOrderClick = () =>{
      setOrderDetails([]);
      setSelectedMedicine([]);
      setPayMethods([]);
      setEntryStep("ordersentry");
    }

    return(
      <>
        <header className="header dropdown px-3 col-12" id="header"
        style={{height: "2.5rem"}}>
          <div className="d-flex justify-content-between align-items-center col-12  h-100">
            <button type="button" onClick={() => navigate('/user/dashboard', {replace: true})}
            className="btn btn-outline-danger">End Session</button>
            <h3>{pharm?.pharmacy_name}</h3>
            <h5>{user.first_name}</h5>
          </div>
          {/* <MedicineSelectNavbar /> */}
        </header>
        {
          entryStep === "ordersentry" && 
          <div className="sales-entry-container d-flex col-12" style={{paddingTop: "3rem"}}>
              <div className="d-flex flex-column col-12 justify-content-between
              sales-entry-container col-md-5 p-0" >
                  <OrderDisplay 
                      newOrders = {medicineDetails}
                      activeCard = {activeCard}
                      handleEditOrder = {handleEditOrder}
                      orderDetails = {orderDetails}
                      totalPrice = {totalPrice}
                  />
                  <PosEntry 
                      PoeCalcHandles= {PoeCalcHandles}
                  />
              </div>
              <div className="col-md-7 px-0" >
                  <InventorySelect 
                      handleNewOrderSelect = {handleNewOrderSelect}
                  />
              </div>
          </div>
        }
        {
          entryStep === "validateorder" && 
          <div style={{paddingTop: "3rem"}}>
            <ValidateOrderNavbar 
              setEntryStep = {setEntryStep}
              totalPrice = {totalPrice}
              step = {{step: "validate"}}
            />
            <ValidateOrders 
              handleVilidateClick = {handleVilidateClick}
              totalPrice = {totalPrice}
              setPayMethods = {setPayMethods}
              payMethods = {payMethods}
            />
          </div>
        }
        {
          entryStep === "receipt" &&
          <div style={{paddingTop: "3rem"}}>
            <ValidateOrderNavbar 
              setEntryStep = {setEntryStep}
              totalPrice = {totalPrice}
              step = {{step: "receipt"}}
            />
            <PrintReceipt 
              orderDetails ={orderDetails}
              medicineDetails ={medicineDetails}
              handleStartNewOrderClick = {handleStartNewOrderClick}
              totalPrice = {totalPrice}
              saleRes = {saleRes}
              payMethods = {payMethods}
            />
          </div>
        }
      </>
    )
}

export default SalesEntry;