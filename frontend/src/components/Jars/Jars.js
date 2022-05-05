// import { jarData } from "./data";
import pic from '../Images/Empty_EJar_2.png';
import {JarCard, JarsContainer, JarItems, JarUl } from "./JarsElements";
import Jar from "./Jar";
import React from "react";
import { JarLi } from "./JarElements";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const Jars = () => {
    const jarData = JSON.parse(localStorage.getItem('jars'));
    const sharedJars = [];
    const personalJars = [];
    for (var i = 0; i < jarData.length; i++) {
        if (jarData[i].type === 'personal') {
            personalJars.push(jarData[i]);
        } else {
            sharedJars.push(jarData[i]);
        }
    };
    return(
        <Tabs className="jarTabs">
            <TabList>
                <Tab>Personal Jars</Tab>
                <Tab>Shared Jars</Tab>
            </TabList>
            <TabPanel>
            {/* <JarsContainer>
            <JarItems>
                <JarUl> */}
                    {personalJars.length === 0 ?
                        <div className='noJarMsg'>
                            <h1>You have no personal jars. Click on the Add Jar button to create a personal jar.</h1>
                        </div>
                        :
                        <JarsContainer>
                        <JarItems>
                        <JarUl>
                        {personalJars.map((jar, index) => {
                            return (
                                <JarLi key={index}><JarCard>
                                    <Jar
                                        src={pic}
                                        text={jar.name}
                                        label={jar.tag}
                                        id={jar.id_String}
                                        type={jar.type}
                                        opening_Time={jar.opening_Time}
                                        status={jar.status}
                                        index={index}
                                        path='/JarPage'/>
                                </JarCard>
                                </JarLi>
                            )
                        })
                        
                        }
                        </JarUl>
                        </JarItems>
                        </JarsContainer>
                }
            </TabPanel>
            <TabPanel>
                    {sharedJars.length === 0 ?
                        <div className='noJarMsg'>
                            <h1>You have no shared jars. Click on the Add Jar button to create a shared jar.</h1>
                        </div>
                        :
                        <JarsContainer>
                        <JarItems>
                        <JarUl>
                        {sharedJars.map((jar, index) => {
                            return (
                                <JarLi key={index}><JarCard>
                                    <Jar
                                        src={pic}
                                        text={jar.name}
                                        label={jar.tag}
                                        id={jar.id_String}
                                        type={jar.type}
                                        opening_Time={jar.opening_Time}
                                        status={jar.status}
                                        index={index}
                                        path='/JarPage'/>
                                </JarCard>
                                </JarLi>
                            )
                        })
                        }
                        </JarUl>
                        </JarItems>
                        </JarsContainer>
                    }
            </TabPanel>
        </Tabs>
    )
}

export default Jars;