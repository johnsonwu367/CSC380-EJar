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


//parameters
//, jar, jarData
const JarsPage = ({}) => {

    const [buttonPopup, setButtonPopup] = useState(false);

    if (jarData.length > 0)
        return (
            <Jars/>
        );
    return (
        <>
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