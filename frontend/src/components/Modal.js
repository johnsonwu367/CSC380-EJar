import React, { useState } from 'react';
import "./Modal.css";
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';

function Modal({ closeModal }) {
    const loginData = JSON.parse(localStorage.getItem('loginData'));
    const [values, setValues] = useState({
        name: '',
        tag: '',
        type: 'personal'
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    
    const [jarNameError, setjarNameError] = useState('')
    const [jarTagError, setjarTagError] = useState('')

    const validate = () => {
        if (!values.name.trim() || !values.tag.trim()) {
            if (!values.name.trim()) {
                setjarNameError("*Please enter a jar name");
            } else {
                setjarNameError("");
            }
            if (!values.tag.trim()) {
                setjarTagError("*Please enter a jar tag");
            } else {
                setjarTagError("");
            }
            return false;
        }
        return true;
    }

    // add jar type here
    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (isValid) {
            let data = {
                email: loginData.email,
                name: values.name.trim(),
                tag: values.tag.trim(),
                type: values.type
            };
            // console.log(data);
            closeModal(false)
            const res = await axios.post("http://localhost:9088/ejar/createJar", data);
            console.log(res.data);
            const res2 = await axios.post("http://localhost:9088/ejar/getJar", loginData.email);
            localStorage.setItem('jars', JSON.stringify(res2.data));
            // console.log(JSON.parse(localStorage.getItem('jars')))
            window.location.reload();
        }
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
                    <p className='errMsg'>{jarNameError}</p>
                    <div>
                        <label htmlFor='tag'>Jar Tag: </label>
                        <input type='text' name='tag' placeholder='Enter a jar tag' value={values.tag} onChange={handleChange}/>
                    </div>
                    <p className='errMsg'>{jarTagError}</p>
                    <div>
                        <label><input type="radio" name="type" value="personal" onChange={handleChange} checked={values.type==="personal"}/>Personal</label>
                        <label><input type="radio" name="type" value="shared" onChange={handleChange} checked={values.type==="shared"}/>Shared</label>
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
