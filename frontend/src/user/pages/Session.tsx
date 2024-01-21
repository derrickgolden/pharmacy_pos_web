import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

const Session = () =>{
    const [pharmacy, setPharmacy] = useState({pharmacy_name: ""})
    const navigate = useNavigate()
    const rerender = useSelector((state: RootState) => state.rerender)

    useEffect(() =>{
        var pharm = sessionStorage.getItem("activepharmacy")
        if(pharm !== null){
            setPharmacy(JSON.parse(pharm));
        }
    }, [rerender])

    const handleSessionStart = () => {
        if(pharmacy?.pharmacy_name?.length){
            navigate("/user/sales-entry");
        }
    };      
    return(
        <div className='body2 bg-white' style={{paddingTop: "2rem"}}>
            <div className="h-100 bg-light px-5 py-5 " 
            style={{minHeight: "100vh"}}>
                <h2>Start new Session</h2>
                <h3>Pharmacy: <b className="text-secondary">
                    {pharmacy?.pharmacy_name? pharmacy?.pharmacy_name : "Select a Pharmacy before proceding"}
                </b></h3>
                {/* <p>{new Date()}</p> */}
                <div onClick={handleSessionStart} style={{width: "fit-content"}}
                className="bg-white d-flex align-items-center justify-content-between" >
                    <button type="button"  className="btn btn-outline-warning"> 
                            Start Session
                        {/* <Link  to="/user/sales-entry" id='session' className="">              
                        </Link> */}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Session;