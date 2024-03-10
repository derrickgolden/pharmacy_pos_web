import { useEffect, useState } from "react";

import { InventorySelect, OrderDisplay, PosEntry, ValidateOrders, PrintReceipt, 
  ListOfOrders, MedicineDetails, Order } from "../sections";
import ValidateOrderNavbar from "../components/pointOfEntry/ValidateOrderNavbar";
import POSnavbar from "../components/pointOfEntry/POSnavbar";
import { getSessionStorage } from "../controllers/getSessionStorage";

import { UpdateStockProps, handleUpdatingStock } from "./calculations/handleUpdatingStock";
import { calcTotalPrice } from "./calculations/calcTotalPrice";
import { regiterSalesApi } from "./apiCalls/registerSales";
import Swal from "sweetalert2";

import { SaleRes } from "./types";

export interface OrderDetail {
  medicine_id: number;
  medicine_name: string;
  units: number;
  sub_total: number;
  price: number;
  package_size: number;
  stock_qty: number;
  open_container_units: number;
  customer_note: string;
}

const SalesEntry = () =>{
    const [activeCard, setActiveCard] = useState(0)
    const [ordersList, setOrdersList] = useState<Order[]>([{ date: new Date().toLocaleString(), 
      orderDetails: [], activeOrder: true, status: "inProgress" , totalPrice: 0
    }])
    const [totalPrice, setTotalPrice] = useState(0)
    const [entryStep, setEntryStep] = useState("inProgress");
    const [payMethods, setPayMethods] = useState<string[]>([])
    const [saleRes, setSaleRes] = useState<SaleRes>();
    const [updateStock, setUpdateStock] = useState<UpdateStockProps[]>([]);
    const [isDigitClicked, setIsDigitClicked] = useState(false);
    const [showInventoryOrders, setShowInventoryOrders] = useState("inventory")

    const [isOnline, setIsOnline] = useState(window.navigator.onLine);

    useEffect(() => {
      const handleOnline = () => {
        setIsOnline(true);
      };
  
      const handleOffline = () => {
        setIsOnline(false);
      };
  
      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);

      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    }, []);

    useEffect(() =>{
      const newTotalPrice = ordersList.reduce((totalPrice, orders) =>{
        if(orders.activeOrder){
          return totalPrice + orders.orderDetails.reduce((total, item) => {
            return total + Number(item.sub_total);
          }, 0) 
        }else return totalPrice 
      }, 0);

      setTotalPrice(newTotalPrice);
    },[ordersList])

    const userPharm = getSessionStorage();
    const { localPharm: pharm } = userPharm.localPharm;

    const PoeCalcHandles = {
        handleDigitClick: (digit: number) => {
          setOrdersList((arr) => {
            return arr.map((order) =>{
              if(order.activeOrder){
                const newDetails =  order.orderDetails.map(orderDetail => {
                  if (orderDetail.medicine_id === activeCard && orderDetail.units >= 0) {
                    let newUnits;
                    if(isDigitClicked){
                      const newUnitsAsString = orderDetail.units.toString() + digit.toString();
                      newUnits = parseInt(newUnitsAsString, 10);
                    }else{
                      newUnits = digit;
                      setIsDigitClicked(true);
                    }
  
                    return handleUpdatingStock(orderDetail, setUpdateStock, activeCard, newUnits);
                  }
                  return orderDetail
                })

                const totalPrice = calcTotalPrice(newDetails);
                return {...order, orderDetails: newDetails, totalPrice }
              }else{
                return order;
              }
            })
          })
        },
      
        handleQuantityIncByOne: () => {
          // Your logic for handling quantity increment by one          
          setOrdersList((arr) => {
            return arr.map(order =>{
              if(order.activeOrder){
                const newOrders = order.orderDetails.map(medicine => {
                  if (medicine.medicine_id === activeCard) {
                    const newUnits = medicine.units + 1;
                    const newOrderDEtails = handleUpdatingStock(medicine, setUpdateStock, activeCard, newUnits);
                    return newOrderDEtails;
    
                  } else {
                    return medicine;
                  }
                });
                const totalPrice = calcTotalPrice(newOrders);
                return {...order, orderDetails: newOrders, totalPrice};
              }
              return order
            })            
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
          setOrdersList((arr) => {
            return arr.map(order =>{
              if(order.activeOrder){
                const [orderDetail] = order.orderDetails.filter(order=> order.medicine_id === activeCard);
                if(orderDetail?.units > 0){
                  const newDetails = order.orderDetails.map(orderDetail => {
                    if (orderDetail.medicine_id === activeCard && orderDetail.units > 0) {
                      const unitsString = orderDetail.units.toString();
    
                      const newUnits = Math.max(parseInt(unitsString.slice(0, -1), 10) || 0, 0);
                      
                      const newStockDetails = handleUpdatingStock(orderDetail, setUpdateStock, activeCard, newUnits);
                      return newStockDetails;
                    } else {
                      return orderDetail;
                    }
                  })
                  return { ...order, orderDetails: newDetails };
                }else{
                  setActiveCard(order.orderDetails[(order.orderDetails.length-2)]?.medicine_id);
                  setUpdateStock((stockArr) =>stockArr.filter(stock => stock?.medicine_id !== activeCard));
                  
                  const newOrderDetails =  order.orderDetails.filter(orderDetail => orderDetail?.medicine_id !== activeCard);
                  return { ...order, orderDetails: newOrderDetails };
                }
              }
              return order;
            })  
          });
        },
      
        handleRefund: () => {
          // Your logic for handling refund
          console.log('Handling Refund');
        },
      
        handleCustomerNote: async() => {
          // Your logic for handling customer note
          let note;
          ordersList.map(order =>{
            if(order.activeOrder){
              order.orderDetails.map(orderDetail => {
                if(orderDetail.medicine_id === activeCard){
                  note = orderDetail.customer_note;
                }
              });
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
          setOrdersList((arr) => {
            return arr.map(order =>{
              if(order.activeOrder){
                const newOrders = order.orderDetails.map(orderDetail => {
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
                return {...order, orderDetails: newOrders};
              }
              return order
            })
          });
        },
      
        handlePayment: () => {          
          if(totalPrice > 0){
            setEntryStep("payment")
            setOrdersList(arr =>{
              return arr.map(order => order.activeOrder? {...order, status: "payment"} : order)
            })
          }
        },

        handleCustomer: () => {
            console.log("Handling Customer");           
        }
    };
            
    const handleNewOrderSelect = ( newOrder: MedicineDetails ) => {
          setOrdersList((arr) => {
            return arr.map(order => {
              if(order.activeOrder){
                const existingMedicine = order.orderDetails.find(medicine => medicine.medicine_id === newOrder.medicine_id);
                if (existingMedicine) {
                  const newOrders = order?.orderDetails.map(medicine => {
                    if (medicine.medicine_id === newOrder.medicine_id) {
                      const newUnits = medicine.units + 1;
                      const newUpdateDetails = handleUpdatingStock(medicine, setUpdateStock, activeCard, newUnits)
                      return newUpdateDetails;
                    } else {
                      return medicine;
                    }
                  });
                  
                  const totalPrice = calcTotalPrice(newOrders);
                  return { ...order, orderDetails: newOrders, totalPrice };
                }else{
                  // calculate Remaining stock; 
                  const newUnits = 1; 
                  const useActiveCard = false;
                  const orderDetail = {...newOrder, units: 1, sub_total: 0, customer_note: ""}
                  const newUpdateDetails = handleUpdatingStock(orderDetail, setUpdateStock, activeCard, newUnits, useActiveCard)
                  const updatedOrderDetails = [...order.orderDetails, newUpdateDetails];
                    const totalPrice = calcTotalPrice(updatedOrderDetails);
                    return { ...order, orderDetails: updatedOrderDetails, totalPrice };
                }
              }else{
                return order;
              }
            })
          });
          setActiveCard(newOrder.medicine_id);
          isDigitClicked? setIsDigitClicked(false) :null;
    };
        
    const handleEditOrder = (order: OrderDetail) =>{
      setActiveCard(order.medicine_id);
      setIsDigitClicked(false);
    };

    const handleVilidateClick = (customerGave: {[key: string]: number}, change: {}) =>{
      const moneyTrans = {...change, customerGave: customerGave || totalPrice};
      const pharmacy_id = pharm?.pharmacy_id;
      const [activeOrder] = ordersList.filter(order => order.activeOrder);
      if(pharmacy_id !== undefined){
        regiterSalesApi({
          orderDetails: activeOrder.orderDetails, totalPrice, setOrdersList,
          moneyTrans, updateStock, payMethods, setEntryStep, setSaleRes, pharmacy_id, isOnline
        });
      };
    };

    const handleNewCustomerOrder = ({date}: {date: string}) =>{
      setOrdersList((arr) =>{
        if(arr.find(arr => arr.date === date)) return arr;
        
        arr.map((obj) =>{
          obj.activeOrder = false;
        })
        return [...arr, { date, orderDetails:[], activeOrder: true, status: "inProgress", totalPrice: 0 }]
      })
      setEntryStep("inProgress");
    }

    const handleDeleteCustomerOrder = (event: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>, order: Order) =>{
      event.stopPropagation();

      setOrdersList((orders) => {
        const updatedArr = orders.filter(obj => obj.date !== order.date);
    
        if (updatedArr.length > 0) {
          const lastOrder = { ...updatedArr[updatedArr.length - 1], activeOrder: true };
          return [...updatedArr.slice(0, -1), lastOrder];
        }
        
        return [{ date: new Date().toLocaleString(), orderDetails:[], activeOrder: true, 
          status: "inProgress", totalPrice: 0 }];
      });
    }
    
    const handleStartNewOrderClick = () =>{
      setOrdersList(arr =>{
        const removeOrder = arr.filter(order => !order.activeOrder);
        return [...removeOrder, { date: new Date().toLocaleString(), 
          orderDetails: [], activeOrder: true, status: "inProgress" , totalPrice: 0
        }]
      })
      setPayMethods([]);
      setUpdateStock([]);
      setEntryStep("inProgress");
    };
   
    return(
      <>            
          <POSnavbar 
            entryStep={entryStep}
            isOnline={isOnline}
            ordersList={ordersList}
            setEntryStep={setEntryStep}
            setShowInventoryOrders={setShowInventoryOrders}
            showInventoryOrders={showInventoryOrders}
          />
        {
          entryStep === "inProgress" && 
          <div className="sales-entry-container d-flex flex-column flex-md-row col-12" 
            >
              <div className={`${showInventoryOrders === "orders" ? "" : "d-none "} d-md-flex 
              flex-column col-12 justify-content-between col-md-5 p-0 grow-1`} >
                {
                  ordersList.map((order, i) =>{
                    return order.activeOrder ? 
                      <OrderDisplay 
                          activeCard = {activeCard}
                          handleEditOrder = {handleEditOrder}
                          orderDetails = {order.orderDetails}
                          totalPrice = {totalPrice}
                      /> : null
                  })
                }
                  <PosEntry 
                      PoeCalcHandles= {PoeCalcHandles}
                  />
              </div>
              <div className={`${showInventoryOrders === "inventory" ? "" : "d-none"} 
              col-md-7 px-0 d-md-flex`} >
                {
                  ordersList.map((order, i) =>{
                    return order.activeOrder ? 
                      <InventorySelect 
                          handleNewOrderSelect = {handleNewOrderSelect}
                          handleEditOrder = {handleEditOrder}
                          orderDetails = {order.orderDetails}
                          handlePayment= {PoeCalcHandles.handlePayment}
                          setShowInventoryOrders = {setShowInventoryOrders}
                      /> : null
                  })
                }
              </div>
          </div>
        }
        {
          entryStep === "payment" && 
          <div>
            <ValidateOrderNavbar 
              setEntryStep = {setEntryStep}
              totalPrice = {totalPrice}
              step = {{step: "payment"}}
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
            {
              ordersList.map((order, i) =>{
                return order.activeOrder && saleRes !== undefined ? 
                  <PrintReceipt 
                    orderDetails ={order.orderDetails}
                    handleStartNewOrderClick = {handleStartNewOrderClick}
                    totalPrice = {totalPrice}
                    saleRes = {saleRes}
                  /> : null
              })
            }
          </div>
        }
        {
          entryStep === "ordersList" && 
          <ListOfOrders 
            ordersList = {ordersList}
            setOrdersList = {setOrdersList}
            activeCard = {activeCard}
            totalPrice = {totalPrice}
            setEntryStep = {setEntryStep}
            handleNewCustomerOrder = {handleNewCustomerOrder}
            handleDeleteCustomerOrder = {handleDeleteCustomerOrder}
          />
        }
      </>
    )
}

export default SalesEntry;

