import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faX } from '@fortawesome/free-solid-svg-icons'
import InventorySelect from "../sections/pointOfEntry/InventorySelect";
import OrderDisplay from "../sections/pointOfEntry/OrderDisplay";
import PosEntry from "../sections/pointOfEntry/POEcalc";
import ValidateOrderNavbar from "../components/pointOfEntry/ValidateOrderNavbar";
import ValidateOrders from "../sections/pointOfEntry/ValidateOrders";
import PrintReceipt from "../sections/pointOfEntry/PrintReceipt";
import { regiterSalesApi } from "./apiCalls/registerSales";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { UpdateStockProps, handleUpdatingStock } from "./calculations/handleUpdatingStock";
import { Medicine } from "../components/inventory/types";
import { getSessionStorage } from "../controllers/getSessionStorage";
import { FaAnglesRight } from "react-icons/fa6";

export interface OrderDetail {
  medicine_id: number;
  units: number;
  sub_total: number;
  price: number;
  package_size: number;
  stock_qty: number;
  open_container_units: number;
  customer_note: string;
}
const SalesEntry = () =>{

    const [medicineDetails, setSelectedMedicine] = useState([])
    const [activeCard, setActiveCard] = useState(0)
    const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [entryStep, setEntryStep] = useState("ordersentry");
    const [payMethods, setPayMethods] = useState<string[]>([])
    const [saleRes, setSaleRes] = useState({});
    const [updateStock, setUpdateStock] = useState<UpdateStockProps[]>([]);
    const [isDigitClicked, setIsDigitClicked] = useState(false);
    const [showInventoryOrders, setShowInventoryOrders] = useState("inventory")

    const navigate = useNavigate()

    useEffect(() =>{
      const newTotalPrice = orderDetails.reduce((total, item) => {
        return total + Number(item.sub_total);
      }, 0);
        setTotalPrice(newTotalPrice)
    },[orderDetails])

    const userPharm = getSessionStorage();
    const { localPharm: pharm } = userPharm.localPharm;
    const { user } = userPharm.user;

    const PoeCalcHandles = {
        handleDigitClick: (digit: number) => {
          console.log(`Digit ${digit} clicked`);
          setOrderDetails((arr) => {
              return arr.map((orderDetail) => {
                if (orderDetail.medicine_id === activeCard && orderDetail.units >= 0) {
                  let newUnits;
                  if(isDigitClicked){
                    const newUnitsAsString = orderDetail.units.toString() + digit.toString();
                    newUnits = parseInt(newUnitsAsString, 10);
                  }else{
                    newUnits = digit;
                    setIsDigitClicked(true);
                  }

                  const newStockDetails = handleUpdatingStock(orderDetail, setUpdateStock, activeCard, newUnits);
                  return newStockDetails;
                } else {
                  return orderDetail
                }
              })
            })
        },
      
        handleQuantityIncByOne: () => {
          // Your logic for handling quantity increment by one          
          setOrderDetails((arr) => {            
            if (arr.length > 0) {
              const newOrders = arr.map(medicine => {
                if (medicine.medicine_id === activeCard) {
                  const newUnits = medicine.units + 1;
                  const newOrderDEtails = handleUpdatingStock(medicine, setUpdateStock, activeCard, newUnits);
                  return newOrderDEtails;

                } else {
                  return medicine;
                }
              });
              return newOrders;
            }else{
              return arr;
            }
          });
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
          // console.log(orderDetails);
          
          setOrderDetails((arr) => {
            const [orderDetail] = arr.filter(orderDetail => orderDetail?.medicine_id === activeCard);
            
            if(orderDetail?.units > 0){
              return arr.map((orderDetail) => {
                if (orderDetail.medicine_id === activeCard && orderDetail.units > 0) {
                  const unitsString = orderDetail.units.toString();

                  const newUnits = Math.max(parseInt(unitsString.slice(0, -1), 10) || 0, 0);
                  
                  const newStockDetails = handleUpdatingStock(orderDetail, setUpdateStock, activeCard, newUnits);
                  return newStockDetails;

                } else {
                  return orderDetail
                }
              })
            }else{
              setSelectedMedicine((arr) =>(arr.filter(medicine => medicine.medicine_id !== activeCard)))
              setActiveCard(medicineDetails[(medicineDetails.length-2)]?.medicine_id);
              setUpdateStock((stockArr) =>stockArr.filter(stock => stock?.medicine_id !== activeCard));
              
              return arr.filter(orderDetail => orderDetail?.medicine_id !== activeCard);
            }
          });
          
        },
      
        handleRefund: () => {
          // Your logic for handling refund
          console.log('Handling Refund');
        },
      
        handleCustomerNote: async() => {
          // Your logic for handling customer note
          let note; 
          orderDetails.map((orderDetail) =>{
            if(orderDetail.medicine_id === activeCard){
              note = orderDetail.customer_note;
            }
          })
          const { value: text } = await Swal.fire({
            input: "textarea",
            inputLabel: "Customer Note",
            inputPlaceholder: "Type your note here...",
            inputValue: `${note}`,
            inputAttributes: {
              "aria-label": "Type your message here"
            },
            showClass: {
              popup: '',      // Disable show animation
            },
            showCancelButton: true,
            returnInputValueOnDeny:true
          });
          setOrderDetails((arr) => {
              const newOrders = arr.map(orderDetail => {
                if (orderDetail?.medicine_id === activeCard) {
                  if (text) {
                    orderDetail.customer_note = text;
                  }else{
                    orderDetail.customer_note = "";
                  }
                  return orderDetail;
                } else {
                  return orderDetail;
                }
              });
              return newOrders;
          });
        },
      
        handlePayment: () => {
          console.log(totalPrice);
          
          if(totalPrice > 0){
            setEntryStep("validateorder")
          }
        },

        handleCustomer: () => {
            console.log("Handling Customer");           
        }
    };
            
    const handleNewOrderSelect = ( newOrder: OrderDetail ) => {

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
                  const newUpdateDetails = handleUpdatingStock(medicine, setUpdateStock, activeCard, newUnits)
                  return newUpdateDetails;
                } else {
                  return medicine;
                }
              });
              return newOrders;
            }else{
              // calculate Remaining stock; 
              const newUnits = 1; 
              const useActiveCard = false;
              const newUpdateDetails = handleUpdatingStock(newOrder, setUpdateStock, activeCard, newUnits, useActiveCard)
              return [...arr, newUpdateDetails]; 
            }
          });
          setActiveCard(newOrder.medicine_id);
          isDigitClicked? setIsDigitClicked(false) :null;
    };
        
    const handleEditOrder = (order: Medicine) =>{
      setActiveCard(order.medicine_id);
      setIsDigitClicked(false);
    };

    const handleVilidateClick = (customerGave: number, change: {}) =>{
      const moneyTrans = {...change, customerGave: customerGave || totalPrice};
      const pharmacy_id = pharm?.pharmacy_id;
      regiterSalesApi({orderDetails, totalPrice, moneyTrans, updateStock, setEntryStep, setSaleRes, pharmacy_id })
    };
    
    const handleStartNewOrderClick = () =>{
      setOrderDetails([]);
      setSelectedMedicine([]);
      setPayMethods([]);
      setUpdateStock([]);
      setEntryStep("ordersentry");
    };
   
    return(
      <>            
          <nav className="navbar navbar-expand-sm z-30 navbar-light w-100 py-0"
            style={{backgroundColor: "#f2f2f3", height: "3rem", zIndex: "10"}}>
              <div className="container-fluid"  style={{backgroundColor: "#f2f2f3"}}>
                <div>
                  {
                    showInventoryOrders !== "inventory" && entryStep === "ordersentry" && (
                      <button type="button" onClick={() => setShowInventoryOrders("inventory")}
                        className="btn btn-outline-link d-md-none">Inventory <FaAnglesRight />
                      </button>
                    )
                  }
                </div>
                <button className="navbar-toggler shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <FontAwesomeIcon icon={faBars} />
                </button>
                <div className=" p-4 p-sm-0 collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="d-flex justify-content-between w-100 navbar-nav me-auto mb-lg-0"
                  >
                    <li className="nav-item">
                      <Link className="nav-link active" aria-current="page" to="#">{pharm?.pharmacy_name}</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link active" aria-current="page" to="#">{user?.first_name}</Link>
                    </li>
                    <li className="nav-item">
                    <button  type="button" onClick={() => navigate('/user/dashboard', {replace: true})}
                      className="btn btn-outline-danger">End Session</button>
                    </li>
                  </ul>
                  
                </div>
              </div>
          </nav>
        {
          entryStep === "ordersentry" && 
          <div className="sales-entry-container d-flex flex-column flex-md-row col-12" 
            >
              <div className={`${showInventoryOrders === "orders" ? "" : "d-none "} d-md-flex 
              flex-column col-12 justify-content-between col-md-5 p-0 grow-1`} >
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
              <div className={`${showInventoryOrders === "inventory" ? "" : "d-none"} 
              col-md-7 px-0 d-md-flex`} >
                  <InventorySelect 
                      handleNewOrderSelect = {handleNewOrderSelect}
                      handleEditOrder = {handleEditOrder}
                      orderDetails = {orderDetails}
                      handlePayment= {PoeCalcHandles.handlePayment}
                      setShowInventoryOrders = {setShowInventoryOrders}
                  />
              </div>
          </div>
        }
        {
          entryStep === "validateorder" && 
          <div>
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
          <div >
            <div className="d-none d-md-block">
              <ValidateOrderNavbar 
                setEntryStep = {setEntryStep}
                totalPrice = {totalPrice}
                step = {{step: "receipt"}}
              />
            </div>
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

