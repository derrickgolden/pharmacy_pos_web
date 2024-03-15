import { FaInfoCircle } from "react-icons/fa";
import { pharmacy } from "../../../assets/images"
import { MedicineDetails } from "../../sections/pointOfEntry/types";
interface POEmedicineCardProps {
    handleNewOrderSelect: (newOrder: MedicineDetails) =>void;
    medicineDetails: MedicineDetails;
}
const POEmedicineCard: React.FC<POEmedicineCardProps> = ({medicineDetails, handleNewOrderSelect}) =>{
    const imgpath = medicineDetails?.img_path;
    // console.log(medicineDetails);
    return(
        <button onClick={() => handleNewOrderSelect(medicineDetails)}
        className=" p-1 col-4 col-sm-3 col-lg-2 btn position-relative medicine-card "
         >
        <div className="card h-100 ">
            <div className="triangle position-absolute top-0 end-0"></div>
            <div  className="position-absolute top-0 end-0  text-white col-2 ">
                <FaInfoCircle
                style={{ cursor: 'pointer' }}
                />
            </div>
            <img className="card-img-top my-0" src={pharmacy} 
            alt="Medicine image"
            style={{height: "60px"}}/>
           <span className="px-1 my-0" 
           style={{height: "50px", textOverflow: 'ellipsis', overflow: "hidden" }}>
                <b>{medicineDetails.medicine_name}</b>
            </span>
           <p className="text-warning px-1">Ksh.{medicineDetails.price}</p>
        </div>
        </button>
    )
}

export default POEmedicineCard;