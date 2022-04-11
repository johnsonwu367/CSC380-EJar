import axios from 'axios';
import React, { useState } from 'react'
import "../Modal.css"

const AddContentModal = ({ closeModal }) => {
    const loginData = JSON.parse(localStorage.getItem('loginData'));
    const currJarInfo = JSON.parse(localStorage.getItem('currentJar'));
    const [content, setContent] = useState("");

    const handleChange = e => {
        setContent(e.target.value)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = {
            jarId: currJarInfo.id,
            email: loginData.email,
            message: content
        };
        const res = await axios.post("http://localhost:9088/ejar/addJarContent", data);
        console.log(res.data);
        closeModal(false);
    }
  return (
    <div className='modalBg'>
        <div className='modalContainer'>
            {/* <div className='closeBtnDiv'>
                <FaTimes className='faTimesBtn' onClick={() => closeModal(false)}/>
            </div> */}
            <div className='title'>
                <h1>Adding Jar Content</h1>
            </div>
            <div className='body'>
                <form onSubmit={handleSubmit}>
                    <div>
                        {/* <label htmlFor='name'>Jar Name: </label> */}
                        <input className='inputBox' type='text' name='name' placeholder='Enter content' value={content} onChange={handleChange}/>
                        {/* <textarea rows="5" cols="80" id="TITLE"></textarea> */}
                    </div>
                    <button className = 'cancelBtn' onClick={() => closeModal(false)}>Cancel</button>
                    <button className = 'submitBtn' type='submit'>Submit</button>
                </form>
            </div>
            {/* <div className='footer'>
                
            </div> */}
        </div>
    </div>
  )
}

export default AddContentModal
