import axios from 'axios';
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';

import { Link, useNavigate } from "react-router-dom";
import { fb, google, left_arrow, logo, show_hide } from '../../../assets/images';
import { setUserDetails } from '../../../redux/userDetails';
import { client_baseurl, server_baseurl } from '../../../baseUrl';
import Swal from 'sweetalert2';

interface PersonDetails{ email: string; password: string; acc_type: string }
type UserAcc = "admin" | "staff";

const Login: React.FC = () =>{
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [acc_type, setAcc_type] =  useState<UserAcc>("admin");
    const [loginDetails, setLoginDetails] = useState<PersonDetails>({
        email:"", password: "", acc_type
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const name = e.target.name
        const value = e.target.value
        setLoginDetails((obj) =>({...obj, [name]: value}))
    }

    useEffect(()=>{
        setLoginDetails((obj) => ({...obj, acc_type}));
    }, [acc_type]);
    
    const handleLoginDetailsSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        
        // console.log(loginDetails);
        let data = JSON.stringify({...loginDetails, auth_with: "app"});
        console.log(data);

        fetch(`${server_baseurl}/user/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'no-cors'
        },
        body: data
        })
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            if(data.success){
                sessionStorage.setItem("user", JSON.stringify(data?.details[0]));
                sessionStorage.setItem("userToken", JSON.stringify(data?.token));
                dispatch(setUserDetails(data?.details[0]));
                navigate('/user/dashboard', {replace: true});
            }else{
                Swal.fire({
                    text: `${data.msg}`,
                    showCloseButton: true,
                    showConfirmButton: false,
                    animation: false,
                    color: "#dc3545",
                    padding: "5px"
                })
            }
        })
        .catch(error => {
            console.log(error);
            setLoginDetails(obj => ({ ...obj, password: '' }));
            Swal.fire({
                text: "Sorry, something went wrong",
                showCloseButton: true,
                showConfirmButton: false,
                animation: false,
                color: "#dc3545",
                padding: "5px"
            })
        });
    }

    return(
        <section className="container-fluid col-12 d-flex justify-content-center auth-bd pt-5"
        style={{minHeight: "100vh"}}>
            <div className="row col-11 col-sm-8 ">
                <div className="col-12 p-0">
                    <div className="bg-overlay pb-5">
                        <div className="container">
                            <div className="row align-items-center">
                                {/* <div className="col-sm-5 col">
                                    <Link className="back-home text-white" to="/">
                                        <img src={left_arrow} alt="image" className="mr-2"/>
                                        Back to Easy Tech
                                    </Link>
                                </div> */}
                                <div className="col-sm-5 col">
                                    <Link to="/">
                                        <img src={logo} alt="image" className="img-fluid"/>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center ">
                            <div className="col-lg-6 text-center bg-white px-3 px-sm-5 py-5 m-5"
                            style={{borderRadius: "1rem"}}
                            >
                                <div className="form-box " >
                                    <h4>Log in to Easy Tech</h4>
                                    <p className="dont-acc text-dark">Don't have an account? 
                                        <Link to={`/user/signup`} className="text-info">&nbsp; Register</Link>
                                    </p>
                                    <div className=" bg-white p-10 rounded" id="myTabContent" style={{ height: "100%" }}>
                                        <div className="tab-pane fade p-10 show active" id="admin" role="tabpanel" aria-labelledby="admin-tab">                                
                                            <form onSubmit={handleLoginDetailsSubmit} action="#" className="mt-3" style={{ height: "100%" }}>
                                                <div className="row h-100">
                                                    <div className="col-12 d-flex ">
                                                        <div className="form-group w-100 text-dark text-left my-3">
                                                            <label htmlFor="email">Enter email</label>
                                                            <input
                                                                onChange={handleInputChange}
                                                                name='email'
                                                                type="email"
                                                                className="form-control"
                                                                placeholder={acc_type === "admin" ? "Email" : "Business Email"}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-12 d-flex align-items-center text-dark ">
                                                        <div className="form-group w-100 text-left">
                                                        <label htmlFor="email">Your Password</label>
                                                            <input
                                                                onChange={handleInputChange}
                                                                name='password'
                                                                type="password"
                                                                className="form-control"
                                                                placeholder="Password"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="btn-area my-3">
                                                    <button type='submit' className="btn btn-primary">Log in</button>
                                                </div>
                                                <div className="remember-forgot d-flex justify-content-between pt-3">                                          
                                                    <div className="forget-pw">
                                                        <Link className='a-link' to="/user/forgot-password">Forgot your password?</Link>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login;