import axios from 'axios';
import React, { useState } from 'react'
import "../Modal.css"

const AddContributorModal = ({ closeModal }) => {
    const currJarInfo = JSON.parse(localStorage.getItem('currentJar'));
    const [contributorEmail, setcontributorEmail] = useState("");

    const handleChange = e => {
        setcontributorEmail(e.target.value)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = {
            jarId: currJarInfo.id,
            email: contributorEmail,
        };
        console.log(data);
        const res = await axios.post("http://localhost:9088/ejar/addContributor", data);
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
                <h1>Adding Contributor</h1>
            </div>
            <div className='body'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='name'>Email: </label>
                        <input className='inputBox' type='email' name='name' placeholder='Enter contributor email' value={contributorEmail} onChange={handleChange}/>
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

export default AddContributorModal
