import React from 'react';
import { FaTimes } from 'react-icons/fa';
import "./OpenJarModal.css";

function OpenJarModal({ closeModal }) {
    const jarContents = JSON.parse(localStorage.getItem('jar-contents'));
  return (
    <div className='modalBackground'>
        <div className='modalWrap'>
            <div className='closeButtonDiv'>
                <FaTimes className='closeBtn' onClick={() => closeModal(false)}/>
            </div>
            {jarContents.length === 0 ? 
                    <h1>Sorry, there are currently no contents in this jar</h1>
                    :
                    <ul>
                    {jarContents.map((contents, index) => {
                        return (
                            <div key={index} className="contentBox">
                                <p>{contents.message}</p>
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
