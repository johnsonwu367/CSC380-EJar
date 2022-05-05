import React, { useState } from 'react'
import "../css/Sidebar.css";
import { IoMdAdd } from 'react-icons/io'
import { CgLogOut } from 'react-icons/cg';
import Modal from '../Modals/Modal';
import LogoutModal from '../Modals/LogoutModal';

const Sidebar = () => {

    const [openModal, setOpenModal] = useState(false);
    const [openLogoutModal, setLogoutModal] = useState(false);

  return (
    <div className='Sidebar'>
        <div className='header'>
            <h1>EJAR</h1>
        </div>
        
      <ul className='Sidebar-List'>
        <li className="row" onClick={() => {setOpenModal(true)}}> 
            <div id="icon"><IoMdAdd/></div> 
            <div id="title">Add Jar</div>
        </li>
        <li className="row" onClick={() => {setLogoutModal(true)}}> 
            <div id="icon"><CgLogOut/></div> 
            <div id="title">Logout</div>
        </li>
      </ul>
      {openModal && <Modal closeModal={setOpenModal}/>}
      {openLogoutModal && <LogoutModal closeModal={setLogoutModal}/>}
    </div>
  )
}

export default Sidebar
