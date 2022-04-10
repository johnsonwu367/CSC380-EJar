import React, {useState} from 'react';
import {JarsContainer, JarItems, JarsH3, JarHeading, JarsP, JarUl} from './JarsElements'
import {JarCard, JarBtn, JarLi, JarBr, JarImg, JarInfo, JarName, JarTags} from './JarsElements'
import pic from "./eJar.jpg";
import Jar from "./Jar";
import {jarData} from "./data";
import CreateJar from "./CreateJar"
import Jars from "./Jars";
import Popup from "./Popup";
import CreateJarForm from "./CreateJarForm";
import GoogleLogin from 'react-google-login';
import Sidebar from '../Sidebar';
import "./JarsPage.css"
import Modal from '../Modal';

//parameters
//, jar, jarData
const JarsPage = () => {
    const loginData = JSON.parse(localStorage.getItem('loginData'));
    // console.log(loginData.jars_owned[0].name)
    const [buttonPopup, setButtonPopup] = useState(false);

    // if (jarData.length > 0)
    //     return (
    //         <Jars/>
    //     );
    return (
        <>
            <Sidebar/>
            <h3>You logged in as {loginData.email}</h3>
            <div className='Jar-display'>
            <JarInfo>
                <JarHeading>No jars currently present, would you like to create a new eJar?</JarHeading>
                <JarBtn onClick={() => setButtonPopup(true)}>Create eJar</JarBtn>
            </JarInfo>
            <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                <CreateJarForm/>
            </Popup>
            </div>
        </>
    );
};

export default JarsPage;