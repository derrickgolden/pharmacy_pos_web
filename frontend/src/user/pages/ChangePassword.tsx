
import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { changePasswordApi } from '../components/auth/apiCalls/changePassword';
import { ThreeDots } from 'react-loader-spinner';

const ChangePassword: React.FC = () => {
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
  const [isLoading, setIsloading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleOldPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmNewPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmNewPassword(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your form submission logic here
    if (newPassword !== confirmNewPassword){
        Swal.fire({
            text: "New password does not match",
            showCloseButton: true,
            showConfirmButton: false,
            animation: false,
            color: "#dc3545",
            padding: "5px"
        })
    }else{
        setIsloading(true);
        changePasswordApi({oldPassword, newPassword, navigate, setIsloading});
        setOldPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
    }
  };

  return (
    <div className='body2 ' style={{paddingTop: "2rem", height: "100vh"}}>
        <section className="upper-section bg-light px-2 px-sm-5 py-5 mb-5 h-100">
            <div className="card" style={{ borderTop: "2px solid rgb(71, 35, 217)" }}>
                <div className="card-header d-flex justify-content-between border-bottom pb-1">
                <div className="">Change Password</div>
                <div onClick={() => navigate(-1)} className="btn btn-info btn-sm">
                    Back
                </div>
                </div>

                <div className="card-body">
                <form onSubmit={handleFormSubmit}>
                    <div className="row">
                    <div className="col-md-6 mt-3">
                        <label htmlFor="oldPassword"><b>Old Password</b></label>
                        <input
                        type="password"
                        id="oldPassword"
                        placeholder="Enter Old password"
                        className="form-control"
                        value={oldPassword}
                        onChange={handleOldPasswordChange}
                        />
                    </div>

                    <div className="col-md-6 mt-3">
                        <label htmlFor="newPassword"><b>New Password</b></label>
                        <input
                        type="password"
                        id="newPassword"
                        placeholder="Enter New Password"
                        className="form-control"
                        value={newPassword}
                        onChange={handleNewPasswordChange}
                        />
                    </div>

                    <div className="col-12 mt-3">
                        <label htmlFor="confirmNewPassword"><b>Confirm New Password</b></label>
                        <input
                        type="password"
                        id="confirmNewPassword"
                        placeholder="Enter Confirm New Password"
                        className="form-control"
                        value={confirmNewPassword}
                        onChange={handleConfirmNewPasswordChange}
                        />
                    </div>
                    </div>

                    <div className="d-flex mt-4">
                        <button type="submit" disabled= {isLoading} 
                            className="btn btn-primary btn-md d-flex gap-3 align-items-center">
                            Change Password
                            <ThreeDots
                            visible={isLoading}
                            height="30"
                            width="30"
                            color="white"
                            radius="24"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            />
                        </button>
                            
                    </div>
                </form>
                </div>
            </div>
        </section>
    </div>
  );
};

export default ChangePassword;
