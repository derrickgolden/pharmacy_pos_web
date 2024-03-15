import axios from "axios";
import { server_baseurl } from "../../../../../baseUrl";
import Swal from "sweetalert2";

interface handleAddGroupProps{
    groupDetails: {group_name: string, description: string}
    setShowDetails: (component: string) =>void
}
export const handleAddGroup = ({groupDetails, setShowDetails}: handleAddGroupProps) =>{

    const tokenString = sessionStorage.getItem("userToken");
    
    
// return;
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

    let data = JSON.stringify(groupDetails);
    // console.log(data);
    
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${server_baseurl}/user/inventory/add-group`,
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        },
        data : data
    };

    axios.request(config)
    .then((response) => {
        if(response.data.success){
            setShowDetails("list");
            Swal.fire({
                title: "Success",
                text: "Group added successfully.",
                icon: "success"
            });
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