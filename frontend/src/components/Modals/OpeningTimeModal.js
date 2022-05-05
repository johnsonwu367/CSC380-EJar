import React, { useState } from 'react';
import "../css/Modal.css";
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';

function OpeningTimeModal({ closeModal }) {
    const currJarInfo = JSON.parse(localStorage.getItem('currentJar'));
    const loginData = JSON.parse(localStorage.getItem('loginData'));
    const [dayError, setDayError] = useState("");
    const [hourError, setHourError] = useState("");
    const [minuteError, setMinuteError] = useState("");
    const [values, setValues] = useState({
        jar_id: currJarInfo.id,
        days: '',
        hours: '',
        minutes: ''
    });

    const handleChange = e => {
        const { name, value } = e.target;
        const re = /^[0-9\b]+$/;
        if (value === '' || re.test(value)) {
            setValues({
                ...values,
                [name]: value
            });
        }
    };


    const validate = () => {
        if (!values.days || !values.hours || !values.minutes) {
            if (!values.days) {
                setDayError("*Please enter a number of days");
            } else {
                setDayError("");
            }
            if (!values.hours) {
                setHourError("*Please enter a number of hours");
            } else {
                setHourError("");
            }
            if (!values.minutes) {
                setMinuteError("*Please enter a number of minutes");
            } else {
                setMinuteError("");
            }
            return false;
        }
        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (isValid) {
            let data = {
                jar_id: currJarInfo.id,
                days: values.days,
                hours: values.hours,
                minutes: values.minutes
            };
            const res = await axios.post("http://localhost:9088/ejar/setOpeningTime", data);
            const res2 = await axios.post("http://localhost:9088/ejar/getJar", loginData.email);
            localStorage.setItem('jars', JSON.stringify(res2.data));
            let index = currJarInfo.index;
            let openTime = res2.data[index].opening_Time;
            currJarInfo.opening_Time = openTime;
            localStorage.setItem('currentJar', JSON.stringify(currJarInfo));
            closeModal(false)
        }
    }
  return (
    <div className='modalBg'>
        <div className='modalContainer'>
            <div className='closeBtnDiv'>
                <FaTimes className='faTimesBtn' onClick={() => closeModal(false)}/>
            </div>
            <div className='title'>
                <h1>Jar Opening Time</h1>
            </div>
            <div className='body'>
                <form onSubmit={handleSubmit}>
                    <div className='inputRow'>
                        <label htmlFor='name'>Days: </label>
                        <input type='text' name='days' value={values.days} onChange={handleChange}/>
                    </div>
                    <p className='errMsg'>{dayError}</p>
                    <div className='inputRow'>
                        <label htmlFor='tag'>Hours: </label>
                        <input type='text' name='hours' value={values.hours} onChange={handleChange}/>
                    </div>
                    <p className='errMsg'>{hourError}</p>
                    <div className='inputRow'>
                        <label htmlFor='tag'>Minutes: </label>
                        <input type='text' name='minutes' value={values.minutes} onChange={handleChange}/>
                    </div>
                    <p className='errMsg'>{minuteError}</p>
                </form>
            </div>
            <div className='footer'>
                <button className = 'submitBtn' onClick={handleSubmit}>Submit</button>
                <button className = 'cancelBtn' onClick={() => closeModal(false)}>Cancel</button>
            </div>
        </div>
    </div>
  )
}

export default OpeningTimeModal
