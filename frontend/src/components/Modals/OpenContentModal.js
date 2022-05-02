import React, { useState } from 'react';
// import ".././Sidebar.css"
import "../css/Modal.css";
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';

function OpenContentModal({ closeModal }) {
    const currJarInfo = JSON.parse(localStorage.getItem('currentJar'));
    const loginData = JSON.parse(localStorage.getItem('loginData'));
    const currentContent = JSON.parse(localStorage.getItem('currentContent'));
    const [currentMessage, setCurrentMessage] = useState(currentContent.message);
    const [editDisabled, setEditDisabled] = useState(true);
    const handleChange = e => {
        setCurrentMessage(e.target.value);
        // console.log(currentMessage);
    };
    function cancelEdit() {
        setEditDisabled(true);
        // setCurrentContent({
        //     message: currentContent.message
        // });
    }
    const handleDelete = async () => {
        const res = await axios.post("http://localhost:9088/ejar/deleteContent", currentContent.content_id);
        console.log(res.data);
        const res2 = await axios.post("http://localhost:9088/ejar/getJarContent", {jarId: currJarInfo.id, email: loginData.email});
        localStorage.setItem('jar-contents', JSON.stringify(res2.data));
        closeModal(false);
    }

    const handleSave = async () => {
        const res = await axios.post("http://localhost:9088/ejar/updateContent", {content_id: currentContent.content_id, message: currentMessage});
        console.log(res.data);
        const res2 = await axios.post("http://localhost:9088/ejar/getJarContent", {jarId: currJarInfo.id, email: loginData.email});
        localStorage.setItem('jar-contents', JSON.stringify(res2.data));
        closeModal(false);
    }
  return (
    <div className='modalBg'>
        <div className='modalContainer'>
            <div className='closeBtnDiv'>
                <FaTimes className='faTimesBtn' onClick={() => closeModal(false)}/>
            </div>
            <div className='title'>
                <h1>View Content</h1>
            </div>
            <div className='body'>
                <textarea className='contentsTxtArea' cols='50' rows='10' type="text" disabled={editDisabled} value={currentMessage} onChange={handleChange}/>
            </div>
            {editDisabled ? 
                   <div className='footer'>
                        <button className = 'submitBtn' onClick={() => {setEditDisabled(false)}}>Edit</button>
                        <button className = 'cancelBtn' onClick={handleDelete}>Delete</button>
                    </div>
                :   <div className='footer'>
                        <button className = 'submitBtn' onClick={handleSave}>Save</button>
                        <button className = 'cancelBtn' onClick={cancelEdit}>Cancel</button>
                    </div>
                }
        </div>
    </div>
  )
}

export default OpenContentModal
