import Swal from "sweetalert2";
import { server_baseurl } from "../../../../baseUrl";
import { Dispatch } from "react";
import { PersonDetails } from "../Login";
import { ActionCreatorWithPayload, AnyAction } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";
import { UserDetails } from "../../../../redux/userDetails";

interface LoginApiProps {
    data: string;
    dispatch: Dispatch<AnyAction>; 
    navigate: NavigateFunction; 
    setLoginDetails: React.Dispatch<React.SetStateAction<PersonDetails>>;
    setUserDetails: ActionCreatorWithPayload<UserDetails, "userDetails/setUserDetails">
}

const loginApi = ({ data, dispatch, setUserDetails, navigate, setLoginDetails }: LoginApiProps) =>{
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

export default loginApi;