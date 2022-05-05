import React from 'react';
import {useNavigate} from 'react-router-dom';
import { GrStatusCriticalSmall } from 'react-icons/gr';
import {JarTag, FigureJarWrap, ImgJar, DivJarsInfo, JarsH5, JarStatus} from './JarElements';

function Jar(props, jar ) {
    let navigate = useNavigate();
    function handleOpenJar(currJar) {
        localStorage.setItem('currentJar', JSON.stringify(currJar))
        if (currJar.type==="personal") {
            navigate("/personal-jar");
        } else if (currJar.type==="shared") {
            navigate("/shared-jar");
        } else {
            navigate("/contributing-jar");
        }
    };
    return (   
        <FigureJarWrap data-category={props.label} onClick={() => {let currJar = {id: props.id, name: props.text, type: props.type, opening_Time: props.opening_Time, status: props.status, index: props.index}; handleOpenJar(currJar);}}>
            <DivJarsInfo>
                <JarsH5>{props.text}</JarsH5>
            </DivJarsInfo>
            <ImgJar alt='Jar Image' src={props.src}/>
            <JarTag>{props.label}</JarTag>
            { (() => {
                switch(props.status) {
                    case 'openable':
                        return <JarStatus style={{color: "green"}}><GrStatusCriticalSmall/></JarStatus>;
                    case 'notSet':
                        return <JarStatus style={{color: "red"}}><GrStatusCriticalSmall/></JarStatus>;
                    default:
                        return <JarStatus style={{color: "yellow"}}><GrStatusCriticalSmall/></JarStatus>;
                }
                })()
            }
        </FigureJarWrap>
    )
}

export default Jar;