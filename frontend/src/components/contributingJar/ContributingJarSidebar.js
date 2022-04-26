import React, { useState } from 'react'
import ".././Sidebar.css"
import { useNavigate } from 'react-router-dom'
import { IoMdAdd } from 'react-icons/io'
import { FiEdit3 } from 'react-icons/fi'
import { MdDeleteForever } from 'react-icons/md'
import axios from 'axios'
import JarContentModal from '../personalJar/JarContentModal'
import AddContentModal from '../personalJar/AddContentModal'
import ContributorRemoveJarModal from './ContributorRemoveJarModal'

const ContributingJarSidebar = () => {
  const currJarInfo = JSON.parse(localStorage.getItem('currentJar'));
  const loginData = JSON.parse(localStorage.getItem('loginData'));
  const [openAddContentModal, setAddContentModal] = useState(false);
  const [jarContentModal, setJarContentModal] = useState(false);
  const [deleteJarModal, setDeleteJarModal] = useState(false);
  let navigate = useNavigate();

  const viewJarContent = async () => {
    const res = await axios.post("http://localhost:9088/ejar/getJarContent", {jarId: currJarInfo.id, email: loginData.email});
    localStorage.setItem('jar-contents', JSON.stringify(res.data));
    // console.log(res);
    // console.log(JSON.parse(localStorage.getItem('jar-contents')));
    setJarContentModal(true);
  }

  const backToJarCollection = async () => {
    const res = await axios.post("http://localhost:9088/ejar/getJar", loginData.email);
    localStorage.setItem('jars', JSON.stringify(res.data));
    navigate("/jar-collections");
  }

  return (
    <div className='Sidebar'>
      <div className='header'>
          <h1 className='SidebarTitle' onClick={backToJarCollection}>EJar</h1>
      </div>
        
      <ul className='Sidebar-List'>
      {currJarInfo.opening_Time===0 ?
              <li className="row"> 
                <div>Jar Opening Time Not Set</div>
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
        {currJarInfo.opening_Time===0 && 
          <li className="row" onClick={viewJarContent}> 
            <div id="icon"><FiEdit3/></div> 
            <div id="title">View Jar Content</div>
          </li>
        }
        <li className="row" onClick={() => {setDeleteJarModal(true)}}> 
            <div id="icon"><MdDeleteForever/></div> 
            <div id="title">Delete Jar</div>
        </li>
      </ul>
      {openAddContentModal && <AddContentModal closeModal={setAddContentModal}/>}
      {jarContentModal && <JarContentModal closeModal={setJarContentModal}/>}
      {deleteJarModal && <ContributorRemoveJarModal closeModal={setDeleteJarModal}/>}
    </div>
  )
}

export default ContributingJarSidebar
