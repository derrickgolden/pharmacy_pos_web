import axios from 'axios';
import { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { left_arrow, register_illus, show_hide, logo } from '../../../assets/images';

import { countries as countriesList } from 'countries-list'
import { CountriesData, SignupDetails } from './types';
import { server_baseurl } from '../../../baseUrl';

import Swal from 'sweetalert2'

const countries: CountriesData = countriesList;
type UserAcc = "owner" | "staff";

const Signup = () =>{
    const navigate = useNavigate()

    const [user_type, setUser_type] =  useState<UserAcc>("owner");
    // admin_email and admin_pass are only used when signing up a user.
    const [signupDetails, setSignupDetails] = useState<SignupDetails>({
        last_name: "", first_name:"",email:"", remember_me: false, position: "",
        country: "KE", password: "", phone:"", user_type: user_type, admin_email: "",
        admin_pass: ""
    })
    useEffect(() =>{
        setSignupDetails((obj) => ({...obj, user_type}))
    }, [user_type]);

    const toggleButton = (role: string) => {
        setUser_type(role);
      };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>{
        const name = e.target.name
        const value = e.target.value
        console.log(value);
        
        if(name !== "remember_me"){
            setSignupDetails((obj) =>({...obj, [name]: value}))
        }else{
            setSignupDetails((obj) =>({...obj, [name]: !obj.remember_me}))
        }
    }

    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    // normal signup
    const handleSignupDetailsSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        
        // console.log(signupDetails);
        const phone = "+" + countries[signupDetails.country].phone + signupDetails.phone
        let data = JSON.stringify({...signupDetails, phone, auth_with: "app"});
        console.log(data);
        

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${server_baseurl}/user/signup`,
            headers: { 
                'Content-Type': 'application/json'
            },
            data : data
        };

        axios.request(config)
        .then((response) => {
            console.log(response.data);
            if(response.data.msg === "User Registered"){
                navigate('/user/login', {replace: true});
            }else{
                Swal.fire({
                    text: `${response.data.msg}`,
                    showCloseButton: true,
                    showConfirmButton: false,
                    animation: false,
                    color: "#dc3545",
                    padding: "5px"
                })
            }
        })
        .catch((error) => {
            console.log(error);
            Swal.fire({
                text: `Server Side Error`,
                showCloseButton: true,
                showConfirmButton: false,
                animation: false,
                color: "#dc3545",
                padding: "5px"
            })
        });
    }

    return(
        <section className="log-reg register land-pg col-12 auth-bd pt-5">
        <div className="overlay pb-120">
            <div className="container">
                <div className="top-head-area">
                    <div className="row align-items-center">
                        <div className="col-sm-5">
                            <Link className="back-home a-link" to='/'>
                                <img src={left_arrow} alt="image"/>
                                Back Home
                            </Link>
                        </div>
                        <div className="col-sm-5">
                            <Link className='a-link' to='/'>
                                <img src={logo} alt="image"/>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-5 d-md-none">
                        <div className="img-area">
                            {/* <img src={register_illus} alt="image"/> */}
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-7 z-1 text-center bg-white p-5 my-5 rounded">
                        <div className="form-box">
                            <h4>Register with Easy Tech</h4>
                            <p className="alr-acc dont-acc">Already have an account? 
                                <Link className='a-link' to='/user/login'>Log in now.</Link>
                            </p>
                            <div className="tab-content">
                                <div className="tab-pane fade show active" id="personal" role="tabpanel" aria-labelledby="personal-tab">
                                    <div className='d-flex justify-content-center mb-3'>
                                        <div className="d-flex col-10 my-2 border px-0 rounded">
                                            {/* Toggle Button */}
                                            <div
                                                className={`toggle-button col-6 py-2 rounded ${user_type === 'owner' ? 'active bg-primary' : 'text-primary'}`}
                                                onClick={() => toggleButton('owner')}
                                            >
                                                Owner
                                            </div>
                                            <div
                                                className={`toggle-button col-6 py-2 rounded ${user_type === 'staff' ? 'active bg-primary' : 'text-primary'}`}
                                                onClick={() => toggleButton('staff')}
                                            >
                                                Staff
                                            </div>
                                        </div>
                                    </div>
                                    <form onSubmit={handleSignupDetailsSubmit} action="#">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <input onChange={(e) =>{handleInputChange(e)}} required
                                                    type="text" name="first_name" className="form-control" placeholder="First Name"/>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <input onChange={(e) =>{handleInputChange(e)}} required
                                                    type="text" name="last_name" className="form-control" placeholder="Last Name"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <select style={{ width: "100%" }}
                                            onChange={handleInputChange} name='country' className="form-control" defaultValue="KE" >
                                                <option value="1">Select Your Country</option>
                                                {Object.keys(countries).map((code, i) => (
                                                    <option key={code} value={code}>
                                                        {countries[code].name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <div className="input-group">
                                                <span className="input-group-text">+{countries[signupDetails.country].phone}</span>
                                                <input onChange={handleInputChange} required
                                                type="number" name="phone" className="form-control" placeholder="Phone Number"/>
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <input onChange={handleInputChange} required
                                            type="email" name="email" className="form-control" placeholder="Your Email"/>
                                        </div>
                                        <div className="mb-3">
                                            <input onChange={handleInputChange} required
                                            type="position" name="position" className="form-control" placeholder="Your Position"/>
                                        </div>
                                        <div className="mb-3">
                                            <div className="input-group">
                                                <input onChange={handleInputChange} required
                                                type={showPassword ? 'text' : 'password'}
                                                    name="password" className="form-control" placeholder="Your Password"/>
                                                <span className="input-group-text" onClick={toggleShowPassword}>
                                                    <img className="showPass" src={show_hide} alt="image"/>
                                                </span>
                                            </div>
                                        </div>
                                        {user_type === "staff" ? 
                                            (
                                            <div className='bg-light p-3 mb-3'>
                                                <h6 className='text-warning'>Owner details to have permission.</h6>
                                                <div className="mb-3">
                                                    <input onChange={handleInputChange} required
                                                    type="admin_email" name="admin_email" className="form-control" placeholder="Owner Email"/>
                                                </div>
                                                <div className="">
                                                    <input onChange={handleInputChange} required
                                                    type="password" name="admin_pass" className="form-control" placeholder="Owner Password"/>
                                                </div>
                                            </div>
                                            ) : null
                                        }
                                        
                                        <div className="btn-area py-2" >
                                            <button type="submit" className="cmn-btn btn btn-primary col-10 ">Register Now</button>
                                        </div>
                                    </form>
                                    <div className="privacy text-dark">
                                        <p>By registering you accept our <Link className='a-link' to="terms-conditions.html">Terms & Conditions
                                        </Link> and <Link className='a-link' to="privacy-policy.html">Privacy Policy</Link></p>
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

export default Signup;