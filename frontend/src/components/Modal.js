import React, { useState } from 'react'
import "./Modal.css"
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';

function Modal({ closeModal }) {
    const loginData = JSON.parse(localStorage.getItem('loginData'));
    const [values, setValues] = useState({
        name: '',
        tag: ''
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
            email: loginData.email,
            name: values.name,
            tag: values.tag
        };
        console.log(data);
        closeModal(false)
        const res = await axios.post("http://localhost:9087/ejar/createJar", data);
        console.log(res.data);
    }

  return (
    <div className='modalBg'>
        <div className='modalContainer'>
            <div className='closeBtnDiv'>
                <FaTimes className='faTimesBtn' onClick={() => closeModal(false)}/>
            </div>
            <div className='title'>
                <h1>Add Jar</h1>
            </div>
            <div className='body'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='name'>Jar Name: </label>
                        <input type='text' name='name' placeholder='Enter a jar name' value={values.name} onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor='tag'>Jar Tag: </label>
                        <input type='text' name='tag' placeholder='Enter a jar tag' value={values.tag} onChange={handleChange}/>
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

export default Modal
