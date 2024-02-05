import { FaChevronRight } from "react-icons/fa";
import { IoAddOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useEffect, useState } from "react";

interface PagesHeaderProps{
    setShowDetails: (showlist: string) => void;
    btnInfo: {text: string, navigate: string, details: string};
}

const PagesHeader: React.FC<PagesHeaderProps> = ({setShowDetails, btnInfo }) =>{
    const [totals, setTotals] = useState<number>()
    const groupList = useSelector((state: RootState) => state.groupList)    
    const medicineList = useSelector((state: RootState) => state.medicineList)
    
    useEffect(() =>{
        if(btnInfo.details === "medicine"){
            setTotals(medicineList.length);
        }else if(btnInfo.details === "group"){
            setTotals(groupList.length)
        }
    }, [btnInfo])
    const handleButtonClick =() =>{
        setShowDetails(btnInfo.navigate)
    }
    return(
        <section className="upper-section bg-light py-5 px-2 mb-5">
            <div className="d-flex flex-wrap justify-content-between align-items-center px-md-5">
                <div>
                    <div className="d-flex align-items-center">
                        <h1 className="font-weight-bold fs-4 lh-1" 
                            style={{fontFamily: 'sans-serif', color: 'rgba(29, 36, 46, 0.5)'}}>
                                Inventory &nbsp;
                        </h1>
                        <FaChevronRight />
                        <h1 className="font-weight-bold fs-4" style={{ fontFamily: 'Poppins', color: '#1D242E' }}>
                            &nbsp; {btnInfo.details ==="medicine"? `List of Medicines(${totals})`:
                                    btnInfo.details === "group"? `List of Groups(${totals})` : null}
                        </h1>
                    </div>
                    <p className="font-family-poppins font-weight-400 font-size-14 line-height-21 text-dark">
                        {btnInfo.details ==="medicine"? `List of medicines available for sales.`:
                        btnInfo.details === "group"? `List of medicine groups available for sales.` : null}
                    </p>
                </div>
                <div className="bg-white d-flex align-items-center" 
                style={{ width: "fit-content", height: "46px" }}>
                    <button onClick={() => handleButtonClick()}
                    type="button" className="btn btn-danger text-white">
                        <IoAddOutline /> {btnInfo.text}
                    </button>
                </div>                  
            </div>
        </section>
    )
}

export default PagesHeader;