import axios from 'axios';
import React, { useState } from 'react'
import "../Modal.css"

const AddContributorModal = ({ closeModal }) => {
    const currJarInfo = JSON.parse(localStorage.getItem('currentJar'));
    const [contributorEmail, setcontributorEmail] = useState("");

    const [emailError, setEmailError] = useState("");

    const validate = () => {
        if (!contributorEmail.trim()) {
            setEmailError("*Please enter a correct email")
            return false;
        }
        return true;
    }

    const handleChange = e => {
        setcontributorEmail(e.target.value)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (isValid) {
            let data = {
                jarId: currJarInfo.id,
                email: contributorEmail.trim(),
            };
            console.log(data);
            const res = await axios.post("http://localhost:9088/ejar/addContributor", data);
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
                <h1>Adding Contributor</h1>
            </div>
            <div className='body'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='name'>Email: </label>
                        <input className='inputBox' type='email' name='name' placeholder='Enter contributor email' value={contributorEmail} onChange={handleChange}/>
                        <p className='errMsg'>{emailError}</p>
                    </div>
                    <button className = 'submitBtn' type='submit'>Submit</button>
                    <button className = 'cancelBtn' onClick={() => closeModal(false)}>Cancel</button>
                </form>
            </div>
            {/* <div className='footer'>
                
            </div> */}
        </div>
    </div>
  )
}

export default AddContributorModal
