import React, { useState } from 'react'
import ".././Sidebar.css"
import { IoMdAdd, IoMdPersonAdd } from 'react-icons/io'
import { FiEdit3 } from 'react-icons/fi'
import { MdDeleteForever } from 'react-icons/md'
import axios from 'axios'
import AddContentModal from './AddContentModal'
import AddContributorModal from './AddContributorModal'
import DeleteJarModal from './DeleteJarModal'
import JarContentModal from './JarContentModal'


const PersonalJarSidebar = () => {
    const currJarInfo = JSON.parse(localStorage.getItem('currentJar'));
    const [openAddContentModal, setAddContentModal] = useState(false);
    const [openAddContributorModal, setAddContributorModal] = useState(false);
    const [deleteJarModal, setDeleteJarModal] = useState(false);
    const [jarContentModal, setJarContentModal] = useState(false);

    const viewJarContent = async () => {
        const res = await axios.post("http://localhost:9088/ejar/getJarContent", currJarInfo.id);
        console.log(res.data);
    }

  return (
      <div className='Sidebar'>
        <div className='header'>
            <h1>EJar</h1>
        </div>
        
      <ul className='Sidebar-List'>
        {/* If jar opening time is set display time and give option to change jar opening time. Need a conditional statement here */}
        <li className="row"> 
            <div id="icon"><IoMdAdd/></div> 
            <div id="title">Set Jar Opening Time</div>
        </li>
        <li className="row" onClick={() => {setAddContentModal(true)}}> 
            <div id="icon"><IoMdAdd/></div> 
            <div id="title">Add Jar Content</div>
        </li>
        {/* This button and function will be gone when jar open time is set */}
        {/* when view jar content button is clicked modal appears with list of jar contents when a jar content is clicked it opens another modal with actual contents displayed on the right and options to edit or delete on the left */}
        <li className="row" onClick={() => setJarContentModal(true)}> 
            <div id="icon"><FiEdit3/></div> 
            <div id="title">View Jar Content</div>
        </li>
        {/* this function should only be avaliable to owners of a shared jar */}
        <li className="row" onClick={() => {setAddContributorModal(true)}}> 
            <div id="icon"><IoMdPersonAdd/></div> 
            <div id="title">Add Contributor</div>
        </li>
        <li className="row" onClick={() => {setDeleteJarModal(true)}}> 
            <div id="icon"><MdDeleteForever/></div> 
            <div id="title">Delete Jar</div>
        </li>
      </ul>
      {openAddContentModal && <AddContentModal closeModal={setAddContentModal}/>}
      {jarContentModal && <JarContentModal closeModal={setJarContentModal}/>}
      {openAddContributorModal && <AddContributorModal closeModal={setAddContributorModal}/>}
      {deleteJarModal && <DeleteJarModal closeModal={setDeleteJarModal}/>}
    </div>
  )
}

export default PersonalJarSidebar
