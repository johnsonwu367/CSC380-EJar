import React from 'react'
import ".././Sidebar.css"

const ContributingJarSidebar = () => {
  return (
    <div>
      <div className='Sidebar'>
        <div className='header'>
            <h1>EJar</h1>
        </div>
        
      <ul className='Sidebar-List'>
        <li className="row"> 
            {/* <div id="icon"><IoMdAdd/></div>  */}
            <div id="title">Set Jar Opening Time</div>
        </li>
        <li className="row"> 
            {/* <div id="icon"><FiEdit3/></div>  */}
            <div id="title">Edit Jar Content</div>
        </li>
        <li className="row"> 
            {/* <div id="icon"><MdDeleteForever/></div>  */}
            <div id="title">Delete Jar Content</div>
        </li>
        <li className="row"> 
            {/* <div id="icon"><IoMdPersonAdd/></div>  */}
            <div id="title">Add Contributor</div>
        </li>
        <li className="row"> 
            {/* <div id="icon"><IoMdPersonAdd/></div>  */}
            <div id="title">Remove Contributor</div>
        </li>
        <li className="row"> 
            {/* <div id="icon"><MdDeleteForever/></div>  */}
            <div id="title">Delete Jar</div>
        </li>
      </ul>
      {/* {openAddContentModal && <AddContentModal closeModal={setAddContentModal}/>}
      {openAddContributorModal && <AddContributorModal closeModal={setAddContributorModal}/>} */}
      </div>
    </div>
  )
}

export default ContributingJarSidebar
