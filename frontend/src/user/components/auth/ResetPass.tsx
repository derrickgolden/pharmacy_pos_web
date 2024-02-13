import axios from 'axios';
import { useState } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";

import { forgot_password_illus, forgot_pwd_2_illus, left_arrow, logo, show_hide } 
    from "../../../assets/images"
import { PersonDetails } from './types';
import { server_baseurl } from '../../../baseUrl';
import Swal from 'sweetalert2';

const ResetPassword: React.FC = () =>{
    const navigate = useNavigate()
    const {urltoken} = useParams()

    console.log(urltoken)

    const [signupDetails, setSignupDetails] = useState<PersonDetails>({
        email:"", password: "", confirm_password: ""
    })
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const name = e.target.name
        const value = e.target.value
        setSignupDetails((obj) =>({...obj, [name]: value}))
    }
    const handleResetPassDetailsSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        
        const {password, confirm_password} = signupDetails;
        if(password !== confirm_password){
            Swal.fire({
                text: `Password does not match`,
                showCloseButton: true,
                showConfirmButton: false,
                animation: false,
                color: "#dc3545",
                padding: "5px"
            })
            return
        }

        // setToken(urltoken.replace(/_/g, '.'));

        let data = JSON.stringify(signupDetails);
        let config = {
            method: 'PATCH',
            maxBodyLength: Infinity,
            url: `${server_baseurl}/user/reset-password`,
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': urltoken
            },
            data : data
        };

        axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            setSignupDetails((obj) =>({email:"", password: "", confirm_password: ""}))
            navigate('/user/login', {replace: true});
        })
        .catch((error) => {
            console.log(error.response.data);
            setSignupDetails((obj) =>({email:"", password: "", confirm_password: ""}))
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
        <section className="log-reg forgot-pws reset-pws two land-pg auth-bd pt-5">
        <div className="overlay pb-120">
            <div className="container">
                <div className="top-head-area">
                    <div className="row d-flex align-items-center">
                        <div className="col-sm-5 col">
                            <a className="back-home" href="index.html">
                                <img src={left_arrow} alt="image"/>
                                Back To Paylio
                            </a>
                        </div>
                        <div className="col-sm-5 col">
                            <a href="index.html">
                                <img src={logo} alt="image"/>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-5 d-flex align-items-end">
                        <div className="img-area">
                            <img src={forgot_pwd_2_illus} alt="image"/>
                        </div>
                    </div>
                    <div className="col-11 col-lg-6 z-1 text-center d-flex align-items-center bg-white rounded my-5 px-3 px-sm-5 py-5">
                        <div className="form-box d-flex flex-column gap-2">
                            <div className="icon-area">
                                <img src={forgot_password_illus} alt="image"/>
                            </div>
                            <h4>Reset Your Password</h4>
                            <p>You can reset password using this form</p>
                            <form onSubmit={handleResetPassDetailsSubmit} action="#">
                                <div className="row">
                                    <div className="col-12 mb-3">
                                        <div className="single-input d-flex align-items-center">
                                            <input onChange={handleInputChange} required className='form-control'
                                            name="email" type="email" placeholder="Email"/>
                                        </div>
                                    </div>
                                    <div className="col-12 mb-3">
                                        <div className="single-input d-flex align-items-center">
                                            <input onChange={handleInputChange} required
                                            name='password' type="password" className="passInput form-control" placeholder="Password"/>
                                            {/* <img className="showPass" src={show_hide} alt="image"/> */}
                                        </div>
                                    </div>
                                    <div className="col-12 mb-3">
                                        <div className="single-input d-flex align-items-center">
                                            <input onChange={handleInputChange} required name='confirm_password'
                                            type="password" className="passInput form-control" placeholder="Confirm Password" />
                                            {/* <img className="showPass" src={show_hide} alt="image"/> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="btn-area">
                                    <button type="submit" className="cmn-btn btn btn-primary">Reset Password</button>
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

export default ResetPassword