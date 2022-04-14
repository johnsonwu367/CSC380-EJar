import React, { useState } from 'react'
import ".././Sidebar.css"
import { IoMdAdd, IoMdPersonAdd } from 'react-icons/io'
import { FiEdit3 } from 'react-icons/fi'
import { MdDeleteForever } from 'react-icons/md'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import AddContentModal from './AddContentModal'
import AddContributorModal from './AddContributorModal'


const PersonalJarSidebar = () => {
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

    const [openAddContentModal, setAddContentModal] = useState(false);
    const [openAddContributorModal, setAddContributorModal] = useState(false);

    const editJarContent = async () => {
        const res = await axios.post("http://localhost:9088/ejar/getJarContent", currJarInfo.id);
        console.log(res.data);
    }

  return (
      <div className='Sidebar'>
        <div className='header'>
            <h1>EJar</h1>
        </div>
        
      <ul className='Sidebar-List'>
        <li className="row" onClick={() => {setAddContentModal(true)}}> 
            <div id="icon"><IoMdAdd/></div> 
            <div id="title">Add Jar Content</div>
        </li>
        <li className="row" onClick={editJarContent}> 
            <div id="icon"><FiEdit3/></div> 
            <div id="title">Edit Jar Content</div>
        </li>
        <li className="row"> 
            <div id="icon"><MdDeleteForever/></div> 
            <div id="title">Delete Jar Content</div>
        </li>
        <li className="row" onClick={() => {setAddContributorModal(true)}}> 
            <div id="icon"><IoMdPersonAdd/></div> 
            <div id="title">Add Contributor</div>
        </li>
        <li className="row" onClick={deleteJar}> 
            <div id="icon"><MdDeleteForever/></div> 
            <div id="title">Delete Jar</div>
        </li>
      </ul>
      {openAddContentModal && <AddContentModal closeModal={setAddContentModal}/>}
      {openAddContributorModal && <AddContributorModal closeModal={setAddContributorModal}/>}
    </div>
  )
}

export default PersonalJarSidebar
