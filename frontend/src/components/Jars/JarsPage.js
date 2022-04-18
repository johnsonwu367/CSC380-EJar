import React, {useState} from 'react';
import {JarsContainer, JarItems, JarsH3, JarHeading, JarsP, JarUl} from './JarsElements'
import {JarCard, JarBtn, JarLi, JarBr, JarImg, JarInfo, JarName, JarTags} from './JarsElements'
import pic from "./eJar.jpg";
import Jar from "./Jar";
// import {jarData} from "./data";
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
    const jarData = JSON.parse(localStorage.getItem('jars'));
    // console.log(loginData);
    // console.log(loginData.jars_owned[0].name)
    const [buttonPopup, setButtonPopup] = useState(false);

    if (jarData.length > 0)
        return (
            <>
            <Sidebar/>
            <h3>You logged in as {loginData.email}</h3>
            <h5>Welcome {loginData.given_name}</h5>
            <Jars/>
            </>
        );
    return (
        <>
            <Sidebar/>
            <h3>You logged in as {loginData.email}</h3>
            <h5>Welcome {loginData.given_name}</h5>
            <div className='Jar-display'>
            <JarInfo>
                <JarHeading>You have no jars in your jar collection. Please click "Add Jar" to add a jar to you collection.</JarHeading>
                {/* <JarBtn onClick={() => setButtonPopup(true)}>Create eJar</JarBtn> */}
            </JarInfo>
            <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                <CreateJarForm/>
            </Popup>
            </div>
        </>
    );
};

export default JarsPage;