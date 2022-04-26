import React, { useState } from 'react';
import "./Sidebar.css";
import { GiMasonJar } from 'react-icons/gi';
import { MdDeleteForever } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import DeleteJarModal from './personalJar/DeleteJarModal';
import axios from 'axios';
import OpenJarModal from './OpenJarModal';

const JarOpeningSidebar = () => {
    const currJarInfo = JSON.parse(localStorage.getItem('currentJar'));
    const [openJar, setOpenJar] = useState(false);
    const [deleteJarModal, setDeleteJarModal] = useState(false);
    let navigate = useNavigate();

    const handleOpenJar = async () => {
        const res = await axios.post("http://localhost:9088/ejar/openJar", currJarInfo.id);
        // pass in or set all recieved jar content
        // console.log(res.data);
        localStorage.setItem('jar-contents', JSON.stringify(res.data));
        setOpenJar(true);
    }

    function backToJarCollection() {
        navigate("/jar-collections");
    }
  return (
    <div>
      <div className='Sidebar'>
        <div className='header'>
            <h1 className='SidebarTitle' onClick={backToJarCollection}>EJar</h1>
        </div>
        
      <ul className='Sidebar-List'>
        <li className="row" onClick={handleOpenJar}> 
            <div id="icon"><GiMasonJar/></div> 
            <div id="title">Open Jar</div>
        </li>
        <li className="row" onClick={() => {setDeleteJarModal(true)}}> 
            <div id="icon"><MdDeleteForever/></div> 
            <div id="title">Delete Jar</div>
        </li>
      </ul>
      {openJar && <OpenJarModal closeModal={setOpenJar}/>}
      {deleteJarModal && <DeleteJarModal closeModal={setDeleteJarModal}/>}
      </div>
    </div>
  )
}

export default JarOpeningSidebar
