import React, { useState } from 'react'
import "./Sidebar.css"
import { IoMdAdd } from 'react-icons/io'
import { CgLogOut } from 'react-icons/cg';
import { useNavigate } from "react-router-dom";
import Modal from './Modal';

const Sidebar = () => {
    let navigate = useNavigate();

    const [openModal, setOpenModal] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('loginData');
        navigate("/");
    };
  return (
    <div className='Sidebar'>
        <div className='header'>
            <h1>EJar</h1>
        </div>
        
      <ul className='Sidebar-List'>
        <li className="row" onClick={() => {setOpenModal(true)}}> 
            <div id="icon"><IoMdAdd/></div> 
            <div id="title">Add Jar</div>
        </li>
        <li className="row" onClick={handleLogout}> 
            <div id="icon"><CgLogOut/></div> 
            <div id="title">Logout</div>
        </li>
      </ul>
      {openModal && <Modal closeModal={setOpenModal}/>}
    </div>
  )
}

export default Sidebar
