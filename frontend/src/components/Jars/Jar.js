import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {LinkJars, DivJarsPic, JarTag, FigureJarWrap, ImgJar, DivJarsInfo, JarsH5} from './JarElements';

function Jar(props, jar ) {
    let navigate = useNavigate();
    function handleOpenJar(currJar) {
        // console.log(currJar);
        localStorage.setItem('currentJar', JSON.stringify(currJar))
        if (currJar.type==="personal") {
            navigate("/personal-jar");
        } else if (currJar.type==="shared") {
            navigate("/shared-jar");
        } else {
            navigate("/contributing-jar");
        }
        // console.log(JSON.parse(localStorage.getItem('currentJar')))

        // if jar is personal jar navigate to personal jar page
        
        // else navigate to owner jar page or collaborator page
    };
    return (   
        <FigureJarWrap data-category={props.label} onClick={() => {let currJar = {id: props.id, name: props.text, type: props.type, opening_Time: props.opening_Time}; handleOpenJar(currJar);}}>
            <DivJarsInfo>
                <JarsH5>{props.text}</JarsH5>
            </DivJarsInfo>
            <ImgJar alt='Jar Image' src={props.src}/>
            <JarTag>{props.label}</JarTag>
        </FigureJarWrap>
    )
}

export default Jar;