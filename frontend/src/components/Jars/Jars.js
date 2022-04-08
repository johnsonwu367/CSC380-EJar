import { jarData } from "./data";
import {JarCard, JarsContainer, JarItems, JarUl } from "./JarsElements";
import Jar from "./Jar";
import React from "react";
import { JarLi } from "./JarElements"

const Jars = ({jars}) => {
    return(
        <JarsContainer>
            <JarItems>
                <JarUl>
                    {jarData.map((jar, index) => {
                        return (
                            <JarLi><JarCard key={index}>
                                <Jar
                                    src={jar.img}
                                    text={jar.name}
                                    label={jar.tags}
                                    path='/JarPage'/>
                            </JarCard></JarLi>
                        )
                    })}
                </JarUl>
            </JarItems>
        </JarsContainer>
    )
}

export default Jars;