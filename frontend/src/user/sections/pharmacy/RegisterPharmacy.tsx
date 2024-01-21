import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useNavigate } from "react-router-dom";
import { regiterPharmacyApi } from "./apiCalls/registerPhamacyApi";

const inputDetails = [
    {label: "Pharmacy Name", type: "text", placeholder: "Pharma one", name: "pharmacy_name"},
    {label: "Location", type: "text", placeholder: "Westlands Nairobi", name: "location"},
    {label: "Pharmacy Email", type: "email", placeholder: "pharmaone@gmail.com", name: "pharmacy_email"},
    {label: "Pharmacy Tel", type: "text", placeholder: "+2547147000000", name: "pharmacy_tel"},
]

const RegisterPhamacy: React.FC = () =>{
    const navigate = useNavigate()

    const [pharmacyDetails, setPharmacyDetails] = useState({
        pharmacy_name: "", location: "", pharmacy_email: "", pharmacy_tel: "", extra_info: "", logo: ""
    })
    const [selectRows, setSelectRows] = useState(3)

    const handleFormInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>{
        const name = e.target.name;
        const value = e.target.value;
    
        setPharmacyDetails((obj) =>({...obj, [name]: value}))
    }

    const handleRegPharmacySubmit: React.FormEventHandler<HTMLFormElement> = (e) =>{
        e.preventDefault()
        console.log(pharmacyDetails);
        
        regiterPharmacyApi({pharmacyDetails, navigate})         
    }

    return(
        <div className='body2 bg-white pb-5' style={{paddingTop: "2rem"}}>
            <section className="upper-section bg-light py-5 mb-5">
                <div className="px-5">
                    <form onSubmit={handleRegPharmacySubmit} enctype="multipart/form-data"
                    className="col-sm-10"> 
                        <div className="d-flex flex-wrap justify-content-between align-items-center ">
                            {
                                inputDetails.map((detail, i) =>(
                                    <div key={i}
                                    className="form-group mb-3 col-sm-5">
                                        <label htmlFor="exampleFormControlInput1">{detail.label}</label>
                                        <input onChange={handleFormInput} 
                                            value={pharmacyDetails[detail.name] as string}
                                            type={detail.type} className="form-control" id="medicinename"
                                            name={detail.name} placeholder={detail.placeholder} required/>
                                    </div>
                                ))
                            }
                                    {/* <div className="form-group mb-3 col-sm-5">
                                        <label htmlFor="exampleFormControlInput1">Upload your logo</label>
                                        <input type="file" name="logo" id="" 
                                            onChange={(e) => setPharmacyDetails(
                                            (obj) =>({...obj, logo: e.target.files[0]}))
                                        } />   
                                    </div> */}
                        </div> 
                        <div className="form-group mb-3 ">
                            <label htmlFor="exampleFormControlTextarea1">Any Etra Info</label>
                            <textarea onChange={handleFormInput} value={pharmacyDetails.extra_info}
                                className="form-control" id="exampleFormControlTextarea1" required name="extra_info"
                                aria-required rows={selectRows}>
                                
                            </textarea>
                        </div>
                        <div className="bg-white d-flex align-items-center justify-content-between " >
                            <button type="submit" className="btn btn-outline-danger">
                                Submit
                            </button>
                            <button onClick={() => navigate(-1)}
                                type="button" className="btn btn-primary text-white">
                                    Cancel
                            </button>
                        </div> 
                    </form>
                </div>
            </section>
        </div>
    )
}

export default RegisterPhamacy;