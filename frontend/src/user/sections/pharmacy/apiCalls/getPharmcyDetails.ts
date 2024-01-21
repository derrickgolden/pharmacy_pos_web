import axios from "axios";
import { server_baseurl } from "../../../../baseUrl";
import Swal from "sweetalert2";

export const getPharmacyDetailsApi = async() =>{

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

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${server_baseurl}/user/pharmacy-details`,
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        },
    };

    return await axios.request(config)
    .then((response) => {
        if(response.data.success){
           return response.data.details
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