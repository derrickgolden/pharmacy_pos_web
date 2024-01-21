import axios from "axios";
import { server_baseurl } from "../../../../baseUrl";
import Swal from "sweetalert2";

interface handleAddGroupProps{
    addMedicineDetails:{
        newMedicineDetails: {
            group_id: number;
            medicine_code: string;
            medicine_name: string;
            group_name: string;
            stock_qty: number;
            instructions: string;
            side_effect: string;
            img_path: File;
        }
        pricingDetails:{
            price: number, unit_of_mesurement: number, package_size: number
        }
    }
    setShowDetails: (component: string) =>void
}
export const addMedicineApi = ({addMedicineDetails, setShowDetails}: handleAddGroupProps) =>{

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

    const {medicine_code, medicine_name, group_name, stock_qty, img_path, side_effect, group_id, instructions} = addMedicineDetails.newMedicineDetails
    const {price, unit_of_mesurement, package_size} = addMedicineDetails.pricingDetails
    // Append newMedicineDetails
    // formData.append('newMedicineDetails', addMedicineDetails.newMedicineDetails);

    // Append pricingDetails
    // formData.append('pricingDetails', addMedicineDetails.pricingDetails);

    // Append newMedicineDetails
    formData.append('medicine_code', medicine_code);
    formData.append('medicine_name', medicine_name);
    formData.append('group_name', group_name);
    formData.append('stock_qty', stock_qty.toString()); // Convert to string if necessary
    formData.append('side_effect', side_effect);
    formData.append('group_id', group_id.toString()); // Convert to string if necessary
    formData.append('instructions', instructions);

    // Append pricingDetails
    formData.append('price', price.toString());
    formData.append('package_size', package_size.toString());
    formData.append('unit_of_mesurement', unit_of_mesurement.toString());

    formData.append('logo', img_path)
    
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${server_baseurl}/user/inventory/add-medicine`,
        headers: { 
            'Content-Type': 'multipart/form-data',
            'Authorization': `${token}`
        },
        data : formData
    };

    axios.request(config)
    .then((response) => {
        if(response.data.success){
            setShowDetails("list");
            Swal.fire({
                title: "Success",
                text: "Medicine added successfully.",
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
            text: `${error.response.data.msg}`,
            icon: "warning"
        });
    });   
}