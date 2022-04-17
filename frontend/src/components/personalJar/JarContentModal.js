import React from 'react'
import "../Modal.css"
import { FaTimes } from 'react-icons/fa';

function JarContentModal({ closeModal }) {
  return (
    <div className='modalBg'>
        <div className='modalContainer'>
            <div className='closeBtnDiv'>
                <FaTimes className='faTimesBtn' onClick={() => closeModal(false)}/>
            </div>
            <div className='title'>
                <h1>Jar Contents</h1>
            </div>
            <div className='body'>
                <h5>Jar contents goes here</h5>
            </div>
            {/* <div className='footer'>
                
            </div> */}
        </div>
    </div>
  )
}

export default JarContentModal
