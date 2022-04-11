import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {LinkJars, DivJarsPic, JarTag, FigureJarWrap, ImgJar, DivJarsInfo, JarsH5} from './JarElements';

function Jar(props, jar ) {
    let navigate = useNavigate();
    function handleOpenJar(currJar) {
        // console.log(currJar);
        localStorage.setItem('currentJar', JSON.stringify(currJar))
        // console.log(JSON.parse(localStorage.getItem('currentJar')))
        navigate("/personal-jar");
    };
    return (   
        <FigureJarWrap data-category={props.label} onClick={() => {let currJar = {id: props.id, name: props.text}; handleOpenJar(currJar);}}>
            <DivJarsInfo>
                <JarsH5>{props.text}</JarsH5>
            </DivJarsInfo>
            <ImgJar alt='Jar Image' src={props.src}/>
            <JarTag>{props.label}</JarTag>
        </FigureJarWrap>
    )
}

export default Jar;