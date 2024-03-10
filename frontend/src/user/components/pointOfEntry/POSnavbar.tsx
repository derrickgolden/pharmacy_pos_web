import { FaAnglesRight } from "react-icons/fa6";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { HiStatusOffline, HiStatusOnline } from "react-icons/hi";

import { getSessionStorage } from "../../controllers/getSessionStorage";
import { Link } from "react-router-dom";
import React from "react";
import { Order } from "../../sections/pointOfEntry/types";

interface POSnavbar{
  showInventoryOrders: string; 
  setShowInventoryOrders: React.Dispatch<React.SetStateAction<string>>; 
  entryStep: string; 
  setEntryStep: React.Dispatch<React.SetStateAction<string>>, 
  isOnline: boolean; 
  ordersList: Order[];
}

const POSnavbar: React.FC<POSnavbar> = ({
  showInventoryOrders, setShowInventoryOrders, entryStep, setEntryStep, isOnline, ordersList}) =>{

    const userPharm = getSessionStorage();
    const { localPharm: pharm } = userPharm.localPharm;
    const { user } = userPharm.user;

    return(
        <nav className="navbar navbar-expand z-30 navbar-light w-100 py-0"
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
                  <h2 className="d-none d-md-block">{pharm?.pharmacy_name}</h2>
                </div>
                <div className="d-flex align-items-center gap-2 ">
                  <div className="fs-4 fw-bold">
                    <span className="bg-info px-2 rounded text-white">
                      {user?.first_name.slice(0,1)}
                    </span>{user?.first_name}
                  </div>
                  <div>
                    {isOnline ? 
                      <HiStatusOnline size={32} className=" text-success"/> :
                      <HiStatusOffline size={32} className=" text-warning"/>
                    }
                  </div>
                  <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                      <FontAwesomeIcon icon={faBars} />
                    </button>
                    <ul className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton1">
                      <li>
                        <Link onClick={() => setEntryStep("ordersList")}
                        className="dropdown-item" to="#"> Orders &nbsp;
                          <span className="bg-info px-1 rounded-circle text-white">{
                            ordersList.length
                          }</span>
                        </Link>
                      </li>
                      <li><Link className="dropdown-item" to="/user/dashboard">End Session</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
          </nav>
    )
}

export default POSnavbar;