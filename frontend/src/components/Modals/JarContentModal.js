import React, { useState } from 'react';
import "../css/Modal.css";
import { FaTimes } from 'react-icons/fa';
import OpenContentModal from './OpenContentModal';
import pic from '../Images/Note_Blue.png';

function JarContentModal({ closeModal }) {
    const jarContents = JSON.parse(localStorage.getItem('jar-contents'));
    const [openContent, setOpenContent] = useState(false);
    function handleOpenContent(content_id, jar_id, email, message) {
        setOpenContent(true);
        const data = {
            content_id: content_id,
            jar_id: jar_id,
            email: email,
            message: message
        };
        localStorage.setItem('currentContent', JSON.stringify(data))
    }
  return (
    <div className='modalBg'>
        <div className='modalContentsContainer'>
            <div className='closeBtnDiv'>
                <FaTimes className='faTimesBtn' onClick={() => closeModal(false)}/>
            </div>
            <div className='title'>
                <h1>Jar Contents</h1>
            </div>
            <div className='body'>
                {jarContents.length === 0 ? 
                    <p>Sorry, there are currently no contents in this jar</p>
                    :
                    <ul className='contentsUl'>
                    {jarContents.map((contents, index) => {
                        return (
                            <li className='contentsLi' key={index}>
                                <div className='imgContainer' onClick={() => {handleOpenContent(contents.id_String, contents.jar_id, contents.owner_email, contents.message)}}>
                                    <img className='contentImg' src={pic} alt=''/>
                                    <p>{contents.created}</p>
                                </div>
                            </li>
                        )
                    })}
                </ul>
                }
            </div>
        </div>
        {openContent && <OpenContentModal closeModal={setOpenContent}/>}
    </div>
  )
}

export default JarContentModal
