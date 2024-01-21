import React, { useState } from "react";
import { handleAddGroup } from "./apiCalls/handleAddGroup";
import { useNavigate } from "react-router-dom";

interface AddGroupFormProps{
    onHandleAddGroupForm: ({}) => void;
    setShowDetails: (showDetails: string) => void
}
const AddGroupForm: React.FC<AddGroupFormProps> = ({onHandleAddGroupForm, setShowDetails}) =>{
    const navigate = useNavigate()
    const [groupDetails, setGroupDetails] = useState({
        group_name: "", description: ""
    })
    const [selectRows, setSelectRows] = useState(3)

    const handleFormInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        const name = e.target.name;
        const value = e.target.value;    
        // console.log(name, value);
            
        setGroupDetails((obj) =>({...obj, [name]: value}))
    }
    const handleAddGroupSubmit: React.FormEventHandler<HTMLFormElement> = (e) =>{
        e.preventDefault()
        handleAddGroup({groupDetails, setShowDetails});
    }

    return(
        <div className="px-5">
            <form onSubmit={handleAddGroupSubmit}
            className="col-sm-10"> 
                <div className="d-flex flex-wrap justify-content-between align-items-center ">
                    <div className="form-group mb-3 col-sm-5">
                        <label htmlFor="exampleFormControlInput1 p-4">Group Name</label>
                        <input onChange={handleFormInput} value={groupDetails.group_name}
                        type="text" className="form-control" id="group_name" name="group_name"
                         placeholder="Generic Medicine" required/>
                    </div>
                </div>  
                
                <div className="form-group mb-3 ">
                    <label htmlFor="exampleFormControlTextarea1 p-4">Description</label>
                    <textarea onChange={handleFormInput} value={groupDetails.description}
                    className="form-control" id="exampleFormControlTextarea1" required name="description"
                        aria-required rows={selectRows} ></textarea>
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

export default AddGroupForm;