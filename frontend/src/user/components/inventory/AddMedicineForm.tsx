import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { addMedicineApi } from "./apiCalls/addMedicineApi";
import { getMedicineGroupList } from "./medicineGroup/apiCalls/getMedicinGroupList";
import { setGroupList } from "../../../redux/groupList";
import PricingDetailsCard from "./PricingDetailsCard";

interface AddMedicineFormProps{
    onHandleAddMedicineForm: ({}) => void;
    setShowDetails: (showDetails: string) => void
}
export interface GroupListProps{
    group_name: string;
    group_id: number;
}

const AddMedicineForm: React.FC<AddMedicineFormProps> = ({ setShowDetails}) =>{
    const groupList: GroupListProps[] = useSelector((state: RootState) => state.groupList)
    const activePharmacy = useSelector((state: RootState) => state.activePharmacy);

    const dispatch = useDispatch();

    const [medicineDetails, setMedicineDetails] = useState({
        medicine_code: '', medicine_name: "", group_name: "", 
        instructions: "", side_effect: "", group_id: null
    })
    const [pricingDetails, setPricingDetails] = useState({});
    const [selectRows, setSelectRows] = useState(3)

    useEffect(() =>{
        const filterNull = false;
        if(activePharmacy.pharmacy){
            const pharmacy_id = activePharmacy.pharmacy?.pharmacy_id
            const apiRes = getMedicineGroupList(filterNull, pharmacy_id);
            apiRes.then(data =>{
                if(data.length){
                    dispatch(setGroupList(data))
                }
            })       
        }
    }, [groupList.length === 0]);

    const handleFormInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>{
        const name = e.target.name;
        const value = e.target.value;
  
        setMedicineDetails((obj) =>({...obj, [name]: value}))
    }
    const handlePricingInput  = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> )=>{
        const name = e.target.name;
        const value = e.target.value;

        setPricingDetails((obj) =>({...obj, [name]: value}))
    }

    const handleAddMedicineSubmit: React.FormEventHandler<HTMLFormElement> = (e) =>{
        e.preventDefault()
        console.log(medicineDetails)
        const [group] = groupList.filter(group => 
            group.group_name.trim() === medicineDetails.group_name.trim()
        )
        console.log(groupList)
        const newMedicineDetails = {...medicineDetails, group_id: group.group_id}

        const addMedicineDetails = {newMedicineDetails, pricingDetails};
        
        const res = addMedicineApi({addMedicineDetails, setShowDetails})
    }

    return(
        <div className="px-3 px-md-5">
            <form onSubmit={handleAddMedicineSubmit} encType="multipart/form-data"
            className="col-sm-10"> 
                <div className="d-flex flex-wrap justify-content-between align-items-center ">
                    <div className="form-group mb-3 col-10 col-sm-5">
                        <label htmlFor="exampleFormControlInput1">Medicine Name</label>
                        <input onChange={handleFormInput} value={medicineDetails.medicine_name}
                        type="text" className="form-control" id="medicinename" name="medicine_name"
                         placeholder="Peneciline" required/>
                    </div>
                    <div className="form-group mb-3 col-10 col-sm-5">
                        <label htmlFor="exampleFormControlInput1">Medicine code(optional)</label>
                        <input onChange={handleFormInput} value={medicineDetails.medicine_code}
                        type="text" className="form-control" id="medicineid" placeholder="1576382"
                        name="medicine_code" />
                    </div>
                    <div className="form-group mb-3 col-10 col-sm-5">
                        <label htmlFor="exampleFormControlSelect1">Medicine Group</label>
                        <select onChange={handleFormInput} value={medicineDetails.group_name}
                        className="form-control" id="exampleFormControlSelect1" name="group_name">
                            <option>-select group-</option>
                            {groupList.map((group, i)=>(
                                <option key={i} >{group.group_name}</option>
                            ))}
                        </select>
                    </div>
                    {/* <div className="form-group mb-3 col-sm-5">
                        <label htmlFor="exampleFormControlInput1">Medicine Image</label>
                            <input type="file" name="logo" id="" 
                                onChange={(e) => setMedicineDetails(
                                (obj) =>({...obj, img_path: e.target.files[0]}))
                        } />   
                    </div> */}
                </div> 

                <PricingDetailsCard 
                    handlePricingInput={handlePricingInput} 
                    pricingDetails= {pricingDetails}
                />

                <div className="form-group mb-3 ">
                    <label htmlFor="exampleFormControlTextarea1">How to Use</label>
                    <textarea onChange={handleFormInput} value={medicineDetails.instructions}
                    className="form-control" id="exampleFormControlTextarea1" required name="instructions"
                        aria-required rows={selectRows}></textarea>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="exampleFormControlTextarea1">Side Effect</label>
                    <textarea onChange={handleFormInput} value={medicineDetails.side_effect}
                    className="form-control" id="exampleFormControlTextarea1" name="side_effect" required 
                        aria-required rows={selectRows}></textarea>
                </div>
                <div className="bg-white d-flex align-items-center justify-content-between " >
                    <button type="submit" className="btn btn-outline-danger">
                        Submit
                    </button>
                    <button onClick={() => setShowDetails("list")}
                        type="button" className="btn btn-primary text-white">
                            Cancel
                    </button>
                </div> 
            </form>
        </div>
    )
}

export default AddMedicineForm;