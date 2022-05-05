import React from 'react';
import "../css/Modal.css";
import { useNavigate } from "react-router-dom";

function LogoutModal({ closeModal }) {
    let navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('loginData');
        navigate("/");
    };

  return (
    <div className='modalBg'>
        <div className='modalContainer'>
            <div className='title'>
                <h1>Logout</h1>
            </div>
            <div className='body'>
                <h5>Are you sure you want to logout?</h5>
            </div>
            <div className='footer'>
                <button className = 'submitBtn' onClick={handleLogout}>Yes</button>
                <button className = 'cancelBtn' onClick={() => closeModal(false)}>No</button>
            </div>
        </div>
    </div>
  )
}

export default LogoutModal