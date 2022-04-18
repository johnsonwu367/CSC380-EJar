import React from 'react'
import { useNavigate } from "react-router-dom";
import "../Modal.css"
import axios from 'axios'

function DeleteJarModal({ closeModal }) {
    let navigate = useNavigate();
    const loginData = JSON.parse(localStorage.getItem('loginData'));
    const currJarInfo = JSON.parse(localStorage.getItem('currentJar'));
    const deleteJar = async () =>{
        const res = await axios.post("http://localhost:9088/ejar/deleteJar", currJarInfo.id);
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
            <div className='title'>
                <h1>Delete Jar</h1>
            </div>
            <div className='body'>
                <h5>Are you sure you want to delete the jar?</h5>
            </div>
            <div className='footer'>
                <button className = 'submitBtn' onClick={deleteJar}>Yes</button>
                <button className = 'cancelBtn' onClick={() => closeModal(false)}>No</button>
            </div>
        </div>
    </div>
  )
}

export default DeleteJarModal
