import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

const Session = () =>{
    const navigate = useNavigate()
    const rerender = useSelector((state: RootState) => state.rerender)
    const activePharmacy = useSelector((state: RootState) => state.activePharmacy); 

    const handleSessionStart = () => {
            navigate("/user/sales-entry");
    }; 

    console.log(activePharmacy);
    return(
        <div className='body2 bg-white' style={{paddingTop: "2rem"}}>
            <div className="h-100 bg-light px-5 py-5 " 
            style={{minHeight: "100vh"}}>
                <h2>Start new Session</h2>
                <h3>Pharmacy: <b className="text-secondary">
                    {activePharmacy.pharmacy? activePharmacy?.pharmacy?.pharmacy_name : "Select a Pharmacy before proceding"}
                </b></h3>
                {
                    activePharmacy.pharmacy? (
                        <div onClick={handleSessionStart} style={{width: "fit-content"}}
                        className="bg-white d-flex align-items-center justify-content-between" >
                            <button type="button"  className="btn btn-outline-warning"> 
                                <Link  to="/user/sales-entry" id='session' className="">              
                                    Start Session
                                </Link>
                            </button>
                        </div>
                    ): null
                }
            </div>
        </div>
    )
}

export default Session;