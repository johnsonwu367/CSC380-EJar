import React, { useState } from 'react';
import "./css/Sidebar.css";
import { GiMasonJar } from 'react-icons/gi';
import { MdDeleteForever } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import DeleteJarModal from './Modals/DeleteJarModal';
import axios from 'axios';
import OpenJarModal from './OpenJarModal';
import ContributorRemoveJarModal from './Modals/ContributorRemoveJarModal';

const JarOpeningSidebar = () => {
    const currJarInfo = JSON.parse(localStorage.getItem('currentJar'));
    // console.log(currJarInfo);
    const [openJar, setOpenJar] = useState(false);
    const [deleteJarModal, setDeleteJarModal] = useState(false);
    const [contributorDeleteJarModal, setContributorDeleteJarModal] = useState(false);
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

    function deleteJar() {
      if (currJarInfo.type === 'contributing') {
        setContributorDeleteJarModal(true)
      } else {
        setDeleteJarModal(true)
      }
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
        <li className="row" onClick={deleteJar}> 
          <div id="icon"><MdDeleteForever/></div> 
          <div id="title">Delete Jar</div>
        </li>
      </ul>
      {openJar && <OpenJarModal closeModal={setOpenJar}/>}
      {deleteJarModal && <DeleteJarModal closeModal={setDeleteJarModal}/>}
      {contributorDeleteJarModal && <ContributorRemoveJarModal closeModal={setContributorDeleteJarModal}/>}
      </div>
    </div>
  )
}

export default JarOpeningSidebar
