import React, { useState } from 'react'
import "../Modal.css"
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';

function OpeningTimeModal({ closeModal }) {
    const currJarInfo = JSON.parse(localStorage.getItem('currentJar'));
    const loginData = JSON.parse(localStorage.getItem('loginData'));
    const [values, setValues] = useState({
        jar_id: currJarInfo.id,
        days: '',
        hours: '',
        minutes: ''
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = {
            jar_id: currJarInfo.id,
            days: values.days,
            hours: values.hours,
            minutes: values.minutes
        };
        // console.log(data);
        closeModal(false)
        const res = await axios.post("http://localhost:9088/ejar/setOpeningTime", data);
        // console.log(res.data);
        const res2 = await axios.post("http://localhost:9088/ejar/getJar", loginData.email);
        localStorage.setItem('jars', JSON.stringify(res2.data));
        // console.log(JSON.parse(localStorage.getItem('jars')))
        window.location.reload();
    }
  return (
    <div className='modalBg'>
        <div className='modalContainer'>
            <div className='closeBtnDiv'>
                <FaTimes className='faTimesBtn' onClick={() => closeModal(false)}/>
            </div>
            <div className='title'>
                <h1>Set Jar Opening Time</h1>
            </div>
            <div className='body'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='name'>Days: </label>
                        <input type='text' name='days' value={values.days} onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor='tag'>Hours: </label>
                        <input type='text' name='hours' value={values.hours} onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor='tag'>Minutes: </label>
                        <input type='text' name='minutes' value={values.minutes} onChange={handleChange}/>
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

export default OpeningTimeModal
