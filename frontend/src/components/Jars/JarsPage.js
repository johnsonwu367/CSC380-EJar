import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
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


//parameters
//, jar, jarData
const JarsPage = () => {
    let navigate = useNavigate();
    const loginData = JSON.parse(localStorage.getItem('loginData'))
    
    const [buttonPopup, setButtonPopup] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('loginData');
        navigate("/");
      };

    // if (jarData.length > 0)
    //     return (
    //         <Jars/>
    //     );
    return (
        <>
            <div>
                <h3>You logged in as {loginData.email}</h3>
                <button onClick={handleLogout}>Logout</button>
            </div>
            <JarInfo>
                <JarHeading>No jars currently present, would you like to create a new eJar?</JarHeading>
                <JarBtn onClick={() => setButtonPopup(true)}>Create eJar</JarBtn>
            </JarInfo>
            <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                <CreateJarForm/>
            </Popup>
        </>
    );
};

export default JarsPage;