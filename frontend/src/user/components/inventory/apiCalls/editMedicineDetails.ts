
import axios from "axios";
import { server_baseurl } from "../../../../baseUrl";
import Swal from "sweetalert2";

interface updateStockProps{
    handleClose: () => void,
    warning_limit: number, medicine_name: string, medicine_id: number
}
export const editMedicineDetailsApi = async (
    {handleClose, warning_limit, medicine_name, medicine_id}: updateStockProps) =>{

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
    
    const data = JSON.stringify({warning_limit, medicine_name, medicine_id})
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${server_baseurl}/user/inventory/update`,
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        },
        data : data
    };

    return await axios.request(config)
    .then((response) => {
        if(response.data.success){
            Swal.fire({
                title: "Success",
                text: "Medicine added successfully.",
                icon: "success"
            }).then((result) =>{
                handleClose();
            });
        }else{
            Swal.fire({
                title: "Failed",
                text: `${response.data.msg}`,
                icon: "warning"
            });
        }
        return {success: response.data.success}
    })
    .catch((error) => {
        console.log(error);
        Swal.fire({
            title: "Failed",
            text: `Server side error`,
            icon: "warning"
        });
        return {success: false}
    });   
}