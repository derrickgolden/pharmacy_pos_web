import BottomSummaryCard from "../userDashboard/BottomSummaryCard"
import DetailCard from "./DetailCard"
import { MedicineDetailsProps } from "./types";

const MedicineDetails: React.FC<MedicineDetailsProps> = ({onHandleActionDetails, medicineDetails, setShowDetails}) =>{
    // console.log(medicineDetails);
    
    return(
        <div className="px-5">
            {<DetailCard 
                key={1}
                data ={medicineDetails}/>}
            <div className="bg-white d-flex align-items-center justify-content-between" >
                <button type="button" className="btn btn-outline-danger">Delete Medicine</button>
                <button onClick={() => setShowDetails("list")}
                    type="button" className="btn btn-primary text-white">
                        Back to Medicine List
                </button>
            </div> 
        </div>
    )
}

export default MedicineDetails