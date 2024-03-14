import axios from "axios";
import { server_baseurl } from "../../../../baseUrl";
import Swal from "sweetalert2";
import { NavigateFunction } from "react-router-dom";

interface handleAddGroupProps{
    pharmacyDetails: {
        pharmacy_name: string;
         location: string;
         pharmacy_email: string;
         pharmacy_tel: string;
         extra_info: string;
         logo: string;
    }
    navigate: NavigateFunction   
}
export const regiterPharmacyApi = ({pharmacyDetails, navigate}: handleAddGroupProps) =>{

    const tokenString = sessionStorage.getItem("userToken");

    if (tokenString !== null) {
        var token = JSON.parse(tokenString);
    } else {
        Swal.fire({
            title: "Token not Found",
            text: "Try to login Again then add the group.",
            icon: "warning"
        });
        return
    }

    const formData = new FormData();
    const {pharmacy_name, location, pharmacy_email, pharmacy_tel, extra_info, logo} = pharmacyDetails

    formData.append('pharmacy_name', pharmacy_name);
    formData.append('location', location);
    formData.append('pharmacy_email', pharmacy_email);
    formData.append('pharmacy_tel', pharmacy_tel);
    formData.append('extra_info', extra_info);
    formData.append('logo', logo); 
    
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${server_baseurl}/user/register-pharmacy`,
        headers: { 
            'Authorization': `${token}`
        },
        data : formData
    };

    axios.request(config)
    .then((response) => {
        if(response.data.success){
            Swal.fire({
                title: "Good job!",
                text: "Pharmacy registered succefully!",
                icon: "success",
                confirmButtonText: "Ok",
              }).then((result) => {
                navigate(-1)
              });
            console.log(response.data);  
        }else{
            Swal.fire({
                title: "Failed",
                text: `${response.data.msg}`,
                icon: "warning"
            });
        }
    })
    .catch((error) => {
        console.log(error);
        Swal.fire({
            title: "Oooops...",
            text: `Server side error`,
            icon: "warning"
        });
    });   
}