// import { jarData } from "./data";
import pic from './eJar.jpg'
import {JarCard, JarsContainer, JarItems, JarUl } from "./JarsElements";
import Jar from "./Jar";
import React from "react";
import { JarLi } from "./JarElements"

const Jars = () => {
    const jarData = JSON.parse(localStorage.getItem('jars'));
    // console.log(jarData[0])
    // const handleOpenJar = (name, jar) => {
    //     console.log()
    //     localStorage.removeItem('loginData');
    //     // navigate("/");
    // };
    return(
        <JarsContainer>
            <JarItems>
                <JarUl>
                    {jarData.map((jar, index) => {
                        return (
                            <JarLi key={index}><JarCard>
                                <Jar
                                    src={pic}
                                    text={jar.name}
                                    label={jar.tag}
                                    id={jar.id_String}
                                    type={jar.type}
                                    opening_Time={jar.opening_Time}
                                    path='/JarPage'/>
                            </JarCard>
                            </JarLi>
                        )
                    })}
                </JarUl>
            </JarItems>
        </JarsContainer>
    )
}

export default Jars;