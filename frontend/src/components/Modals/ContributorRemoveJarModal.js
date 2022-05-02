import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import "../css/Modal.css";

function ContributorRemoveJarModal({ closeModal }) {
    let navigate = useNavigate();
    const currJarInfo = JSON.parse(localStorage.getItem('currentJar'));
    const loginData = JSON.parse(localStorage.getItem('loginData'));
    const handleSubmit = async () =>{
        const res = await axios.post("http://localhost:9088/ejar/removeContributor", {jarId: currJarInfo.id, emails: [loginData.email]});
        // console.log(res.data);
        const res2 = await axios.post("http://localhost:9088/ejar/getJar", loginData.email);
        // console.log(res2.data);
        localStorage.setItem('jars', JSON.stringify(res2.data));
        // console.log(JSON.parse(localStorage.getItem('jars')));
        navigate("/jar-collections");

    }
  return (
    <div className='modalBg'>
        <div className='modalContainer'>
            {/* <div className='closeBtnDiv'>
                <FaTimes className='faTimesBtn' onClick={() => closeModal(false)}/>
            </div> */}
            <div className='title'>
                <h1>Delete Jar</h1>
            </div>
            <div className='body'>
                <p>Are you sure you want to delete this jar? If you delete this jar you will no longer be a contributor and all your contents in this jar will be removed.</p>
            </div>
            <div className='footer'>
                <button className = 'submitBtn' onClick={handleSubmit}>Yes</button>
                <button className = 'cancelBtn' onClick={() => closeModal(false)}>No</button>
            </div>
        </div>
    </div>
  )
}

export default ContributorRemoveJarModal
