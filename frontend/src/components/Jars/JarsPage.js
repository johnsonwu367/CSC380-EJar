import React from 'react';
import Jars from "./Jars";
import Sidebar from '../Sidebars/Sidebar';
import "../css/JarsPage.css";

const JarsPage = () => {
    const loginData = JSON.parse(localStorage.getItem('loginData'));
    return (
        <>
        <Sidebar/>
        <div className='heading'>
            <h1>Hey {loginData.given_name}, welcome to EJar!</h1>
            <h3>You logged in as {loginData.email}</h3>
        </div>
        <Jars/>
        </>
    )
};

export default JarsPage;