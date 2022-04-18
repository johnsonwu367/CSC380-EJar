import React, { useState } from 'react'
import ".././Sidebar.css"
import { IoMdAdd, IoMdPersonAdd } from 'react-icons/io'
import { FiEdit3 } from 'react-icons/fi'
import { BiTime } from 'react-icons/bi'
import { MdDeleteForever } from 'react-icons/md'
import { GiMasonJar } from 'react-icons/gi'
import axios from 'axios'
import AddContentModal from './AddContentModal'
import AddContributorModal from './AddContributorModal'
import DeleteJarModal from './DeleteJarModal'
import JarContentModal from './JarContentModal'
import OpeningTimeModal from './OpeningTimeModal'


const PersonalJarSidebar = () => {
    const currJarInfo = JSON.parse(localStorage.getItem('currentJar'));
    const loginData = JSON.parse(localStorage.getItem('loginData'));
    const [openAddContentModal, setAddContentModal] = useState(false);
    const [openAddContributorModal, setAddContributorModal] = useState(false);
    const [deleteJarModal, setDeleteJarModal] = useState(false);
    const [jarContentModal, setJarContentModal] = useState(false);
    const [openingTimeModal, setOpeningTimeModal] = useState(false);

    const viewJarContent = async () => {
        const res = await axios.post("http://localhost:9088/ejar/getJarContent", {jarId: currJarInfo.id, email: loginData.email});
        localStorage.setItem('jar-contents', JSON.stringify(res.data));
        // console.log(JSON.parse(localStorage.getItem('jar-contents')));
        setJarContentModal(true);
    }
    
    const handleOpenJar = async () => {
      const res = await axios.post("http://localhost:9088/ejar/openJar", currJarInfo.id);
      console.log(res.data);
    }

  return (
      <div className='Sidebar'>
        <div className='header'>
            <h1>EJar</h1>
        </div>
        
      <ul className='Sidebar-List'>
        {/* If jar opening time is set display time and give option to change jar opening time. Need a conditional statement here */}
        {currJarInfo.opening_Time===0 ?
              <li className="row" onClick={setOpeningTimeModal}> 
                <div id="icon"><BiTime/></div> 
                <div id="title">Set Jar Opening Time</div>
              </li>
            :
              <li className="row"> 
                <div>{currJarInfo.opening_Time}</div>
              </li>
          }
        <li className="row" onClick={() => {setAddContentModal(true)}}> 
            <div id="icon"><IoMdAdd/></div> 
            <div id="title">Add Jar Content</div>
        </li>
        {/* This button and function will be gone when jar open time is set */}
        {/* when view jar content button is clicked modal appears with list of jar contents when a jar content is clicked it opens another modal with actual contents displayed on the right and options to edit or delete on the left */}
        {/* () => setJarContentModal(true) */}
        <li className="row" onClick={viewJarContent}> 
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
        <li className="row" onClick={handleOpenJar}> 
            <div id="icon"><GiMasonJar/></div> 
            <div id="title">Open Jar</div>
        </li>
      </ul>
      {openAddContentModal && <AddContentModal closeModal={setAddContentModal}/>}
      {jarContentModal && <JarContentModal closeModal={setJarContentModal}/>}
      {openAddContributorModal && <AddContributorModal closeModal={setAddContributorModal}/>}
      {deleteJarModal && <DeleteJarModal closeModal={setDeleteJarModal}/>}
      {openingTimeModal && <OpeningTimeModal closeModal={setOpeningTimeModal}/>}
    </div>
  )
}

export default PersonalJarSidebar