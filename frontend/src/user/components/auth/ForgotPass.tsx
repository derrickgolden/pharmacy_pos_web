import { Link } from "react-router-dom"
import { forgot_password_illus, left_arrow, logo } from "../../../assets/images"

import axios from 'axios';
import { useState } from "react";
import { PersonDetails } from "./types";
import Swal from "sweetalert2";

const ForgotPassword: React.FC = () =>{
    const [emailDetails, setEmailDetails] = useState<PersonDetails>({
        email:"", password: "", confirm_password: ""
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const value: string = e.target.value;
        setEmailDetails(emailDetails => ({...emailDetails, email: value}));
    }
    const handleEmailDetailsSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        
        const {password, confirm_password} = emailDetails;
        if(password !== confirm_password){
            Swal.fire({
                text: "password does not match",
                showCloseButton: true,
                showConfirmButton: false,
                animation: false,
                color: "#dc3545",
                padding: "5px"
            })
            return
        }

        let data = JSON.stringify(emailDetails);
        let config = {
            method: 'POST',
            maxBodyLength: Infinity,
            url: 'http://localhost:5000/user/forgot-password',
            headers: { 
                'Content-Type': 'application/json'
            },
            data : data
        };

        axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            Swal.fire({
                text: "Link sent to your email, use the link to reset your password",
                showCloseButton: true,
                showConfirmButton: false,
                animation: false,
                color: "#dc3545",
                padding: "5px"
            })
        })
        .catch((error) => {
            Swal.fire({
                text: `Error: ${error.response.data.msg}`,
                showCloseButton: true,
                showConfirmButton: false,
                animation: false,
                color: "#dc3545",
                padding: "5px"
            })
        });
    }
    return(
        <section className=" auth-bd"  style={{minHeight: "100vh"}}>
        <div className="">
            <div className="container">
                <div className="top-head-area">
                    <div className="row d-flex align-items-center">
                        <div className="col-sm-5 col">
                            <Link className="back-home" to="/">
                                <img src={left_arrow} alt="image"/>
                                Back To Paylio
                            </Link>
                        </div>
                        <div className="col-sm-5 col">
                            <Link to="/">
                                <img src={logo} alt="image"/>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center  ">
                    <div className="col-11 col-lg-6 text-center bg-white my-5 px-3 px-sm-5 py-5 rounded">
                        <div className="form-box d-flex flex-column gap-2">
                            <div className="icon-area">
                                <img src={forgot_password_illus} alt="image"/>
                            </div>
                            <h4>Forgot your password?</h4>
                            <p>To reset your password, enter the email address that you used to set up your Paylio account. We'll send you a link to help you get back into your account.</p>
                            <form onSubmit={handleEmailDetailsSubmit} action="#">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group w-100 text-dark text-left my-3">
                                        <label htmlFor="email">Enter email</label>
                                                            <input
                                                                onChange={handleInputChange}
                                                                name='email'
                                                                type="email"
                                                                className="form-control"
                                                                placeholder="Your Email"
                                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="btn-area col-12">
                                    <button type="submit" className="cmn-btn btn btn-primary">Recover Password</button>
                                </div>
                            </form>
                            <p className="back-login dont-acc">Go back to <Link to='/user/login'>Login</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
}

export default ForgotPassword