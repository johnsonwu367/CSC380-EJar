import React, { useState } from 'react';
import "../css/Sidebar.css";
import { BiTime } from 'react-icons/bi';
import { MdDeleteForever } from 'react-icons/md';
import { IoPersonRemoveSharp, IoPersonAddSharp } from 'react-icons/io5';
import { IoMdAdd } from 'react-icons/io';
import { FiEdit3 } from 'react-icons/fi';
import { GrOverview } from 'react-icons/gr'
import { useNavigate } from 'react-router-dom';
import AddContentModal from '../Modals/AddContentModal';
import axios from 'axios';
import JarContentModal from '../Modals/JarContentModal';
import AddContributorModal from '../personalJar/AddContributorModal';
import DeleteJarModal from '../Modals/DeleteJarModal';
import RemoveContributorModal from '../personalJar/RemoveContributorModal';
import OpeningTimeModal from '../Modals/OpeningTimeModal';

const OwnerJarSidebar = () => {
  let navigate = useNavigate();
  const currJarInfo = JSON.parse(localStorage.getItem('currentJar'));
  const loginData = JSON.parse(localStorage.getItem('loginData'));
  const [openingTimeModal, setOpeningTimeModal] = useState(false);
  const [openAddContentModal, setAddContentModal] = useState(false);
  const [jarContentModal, setJarContentModal] = useState(false);
  const [openAddContributorModal, setAddContributorModal] = useState(false);
  const [removeContributorModal, setRemoveContributorModal] = useState(false);
  const [deleteJarModal, setDeleteJarModal] = useState(false);

  const backToJarCollection = async () => {
    const res = await axios.post("http://localhost:9088/ejar/getJar", loginData.email);
    localStorage.setItem('jars', JSON.stringify(res.data));
    navigate("/jar-collections");
  }

  const viewJarContent = async () => {
    const res = await axios.post("http://localhost:9088/ejar/getJarContent", {jarId: currJarInfo.id, email: loginData.email});
    localStorage.setItem('jar-contents', JSON.stringify(res.data));
    // console.log(JSON.parse(localStorage.getItem('jar-contents')));
    setJarContentModal(true);
}

const getContributors = async () => {
  const res = await axios.post("http://localhost:9088/ejar/getContributors", currJarInfo.id);
  localStorage.setItem('jar-contributors', JSON.stringify(res.data));
  // console.log(JSON.parse(localStorage.getItem('jar-contributors')));
  setRemoveContributorModal(true);
}

  return (
    <div className='Sidebar'>
      <div className='header'>
          <h1 className='SidebarTitle' onClick={backToJarCollection}>EJar</h1>
      </div>
        
      <ul className='Sidebar-List'>
        {currJarInfo.opening_Time===0 ?
          <li className="row" onClick={setOpeningTimeModal}> 
            <div id="icon"><BiTime/></div> 
            <div id="title">Set Jar Opening Time</div>
          </li>
          :
          <li className="row" onClick={setOpeningTimeModal}> 
            <div>{currJarInfo.opening_Time}</div>
          </li>
        }
        <li className="row" onClick={() => {setAddContentModal(true)}}> 
            <div id="icon"><IoMdAdd/></div>
            <div id="title">Add Jar Content</div>
        </li>
        {currJarInfo.opening_Time===0 && 
          <li className="row" onClick={viewJarContent}> 
            <div id="icon"><FiEdit3/></div> 
            <div id="title">View Jar Content</div>
          </li>
        }
        <li className="row" onClick={() => {setAddContributorModal(true)}}> 
            <div id="icon"><IoPersonAddSharp/></div>
            <div id="title">Add Contributor</div>
        </li>
        <li className="row" onClick={getContributors}> 
            <div id="icon"><IoPersonRemoveSharp/></div> 
            <div id="title">Remove Contributor</div>
        </li>
        <li className="row" onClick={() => {setDeleteJarModal(true)}}> 
            <div id="icon"><MdDeleteForever/></div> 
            <div id="title">Delete Jar</div>
        </li>
      </ul>
      {openingTimeModal && <OpeningTimeModal closeModal={setOpeningTimeModal}/>}
      {openAddContentModal && <AddContentModal closeModal={setAddContentModal}/>}
      {jarContentModal && <JarContentModal closeModal={setJarContentModal}/>}
      {openAddContributorModal && <AddContributorModal closeModal={setAddContributorModal}/>}
      {removeContributorModal && <RemoveContributorModal closeModal={setRemoveContributorModal}/>}
      {deleteJarModal && <DeleteJarModal closeModal={setDeleteJarModal}/>}
    </div>
  )
}

export default OwnerJarSidebar
