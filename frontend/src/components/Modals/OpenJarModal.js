import React from 'react';
import { FaTimes } from 'react-icons/fa';
import "../css/OpenJarModal.css";

function OpenJarModal({ closeModal }) {
    const jarContents = JSON.parse(localStorage.getItem('jar-contents'));
  return (
    <div className='modalBackground'>
        <div className='modalWrap'>
            <div className='closeButtonDiv'>
                <FaTimes className='closeBtn' onClick={() => closeModal(false)}/>
            </div>
            {jarContents.length === 0 ? 
                    <h1>Sorry, there are no contents in this jar</h1>
                    :
                    <ul className='openJarContentsUl'>
                    {jarContents.map((contents, index) => {
                        return (
                            <div key={index} className='contentBoxContainer'>
                                <div className="contentBox">
                                    <h4>{contents.given_name}:</h4>
                                    <p>{contents.message}</p>
                                </div>
                            </div>
                        )
                    })}
                </ul>
            }
        </div>
    </div>
  )
}

export default OpenJarModal
