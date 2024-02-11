import axios from "axios";
import { server_baseurl } from "../../../../../baseUrl";
import Swal from "sweetalert2";

interface handleAddGroupProps{
    groupDetails: {group_name: string, description: string}
    setShowDetails: (component: string) =>void
}
export const getMedicineGroupList = async(filterNull: boolean, pharmacy_id: number) =>{

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
    
    const data = JSON.stringify({ filterNull, pharmacy_id });
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${server_baseurl}/user/inventory/get-groups`,
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        },
        data: data
    };

    return await axios.request(config)
    .then((response) => {
        if(response.data.success){
            // console.log(response);
            
            return(response.data.details)
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
            text: `Server side error while fetching medicine List`,
            icon: "warning"
        });
    });   
}