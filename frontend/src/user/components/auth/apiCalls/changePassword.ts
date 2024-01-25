import axios from "axios";
import Swal from "sweetalert2";
import { server_baseurl } from "../../../../baseUrl";

interface ChangePassProps{
    oldPassword: string;
    newPassword: string;
    navigate: (val: string) => void;
    setIsloading: (val: boolean) => void;
}
export const changePasswordApi = ({oldPassword, newPassword, navigate, setIsloading}: ChangePassProps) =>{

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

    let data = JSON.stringify({oldPassword, newPassword});
    
    let config = {
        method: 'PATCH',
        maxBodyLength: Infinity,
        url: `${server_baseurl}/user/change-pass`,
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        },
        data : data
    };

    axios.request(config)
    .then((response) => {
        if(response.data.success){
            Swal.fire({
                title: "Success",
                text: `${response.data.msg}`,
                icon: "success"
            }).then((result) =>{
                navigate("/");
            });
        }else{
            Swal.fire({
                title: "Failed",
                text: `${response.data.msg}`,
                icon: "warning"
            });
            setIsloading(false)
        }
    })
    .catch((error) => {
        console.log(error);
        Swal.fire({
            title: "Oooops...",
            text: `Server side error`,
            icon: "warning"
        });
        setIsloading(false);
    });   
}