import React, { useState } from 'react';
import ".././Modal.css";
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';

function RemoveContributorModal({ closeModal }) {
    const currJarInfo = JSON.parse(localStorage.getItem('currentJar'));
    const jarContributors = JSON.parse(localStorage.getItem('jar-contributors'));
    const emailSelected = [];
    const [selectionError, setSelectionError] = useState("");

    const handleChange = (e) => {
        if (e.target.checked) {
            if (!emailSelected.includes(e.target.value)){
                emailSelected.push(e.target.value);
            }
        } else {
            if (emailSelected.includes(e.target.value)) {
                const index = emailSelected.indexOf(e.target.value);
                emailSelected.splice(index, 1);
            }
        }
        console.log(emailSelected);
    }

    const validate = () => {
        if (emailSelected.length === 0) {
            setSelectionError("*Please select a contributor email")
            return false;
        }
        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (isValid) {
            const res = await axios.post("http://localhost:9088/ejar/removeContributor", {jarId: currJarInfo.id, emails: emailSelected});
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
                <h1>Remove Contributor</h1>
            </div>
            <div className='body'>
                {jarContributors.length === 0 ?
                    <p>Sorry, this jar currently has no contributors</p>
                    :
                    <ul>
                    {jarContributors.map((contributor, index) => {
                        return (
                            <div key={index}>
                                <input type="checkbox" value={contributor} onChange={handleChange}/>
                                {contributor}
                            </div>
                        )
                    })}
                    </ul>
                }
                <p className='errMsg'>{selectionError}</p>
            </div>
            <div className='footer'>
                {jarContributors.length !== 0 &&
                    <button className = 'submitBtn' onClick={handleSubmit}>Submit</button>
                }
                <button className = 'cancelBtn' onClick={() => closeModal(false)}>Cancel</button>
            </div>
        </div>
    </div>
  )
}

export default RemoveContributorModal
