import axios from 'axios';
import React, { useState } from 'react';
import "../css/Modal.css";

const AddContentModal = ({ closeModal }) => {
    const loginData = JSON.parse(localStorage.getItem('loginData'));
    const currJarInfo = JSON.parse(localStorage.getItem('currentJar'));
    const [content, setContent] = useState("");
    const [addjarContentError, setjarContentError] = useState('');

    const validate = () => {   
        if (!content.trim()) {
            setjarContentError("*Please enter some contents");
            return false;
        }
        return true;
    };

    const handleChange = e => {
        setContent(e.target.value)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (isValid) {
            let data = {
                jarId: currJarInfo.id,
                email: loginData.email,
                message: content.trim()
            };
            const res = await axios.post("http://localhost:9088/ejar/addJarContent", data);
            console.log(res.data);
            closeModal(false);
        }
    }
  return (
    <div className='modalBg'>
        <div className='modalContainer'>
            {/* <div className='closeBtnDiv'>
                <FaTimes className='faTimesBtn' onClick={() => closeModal(false)}/>
            </div> */}
            <div className='title'>
                <h1>Add Jar Content</h1>
            </div>
            <div className='body'>
                <form onSubmit={handleSubmit}>
                    <div>
                        {/* <label htmlFor='name'>Jar Name: </label> */}
                        <textarea className='contentsTxtArea' cols='50' rows='10' type='text' name='name' placeholder='Enter content' value={content} onChange={handleChange}/>
                    </div>
                    <p className='errMsg'>{addjarContentError}</p>
                    <div className='buttons'>
                        <button className = 'submitBtn' type='submit'>Submit</button>
                        <button className = 'cancelBtn' onClick={() => closeModal(false)}>Cancel</button>
                    </div>
                </form>
            </div>
            {/* <div className='footer'>
                
            </div> */}
        </div>
    </div>
  )
}

export default AddContentModal
