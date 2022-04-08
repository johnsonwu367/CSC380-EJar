import React from 'react';
import {Link} from 'react-router-dom';
import {LinkJars, DivJarsPic, JarTag, JarLi, FigureJarWrap, ImgJar, DivJarsInfo, JarsH5} from './JarElements';

function Jar(props, jar ) {
    return (
        <JarLi>
            {/*<LinkJars to={props.path}>*/}
            <FigureJarWrap data-category={props.label}>
                <DivJarsInfo>
                    <JarsH5>{props.text}</JarsH5>
                </DivJarsInfo>
                <ImgJar alt='Jar Image' src={props.src}/>
                <JarTag>{props.label}</JarTag>
            </FigureJarWrap>
            {/*</LinkJars>*/}
        </JarLi>

    )
}

export default Jar;