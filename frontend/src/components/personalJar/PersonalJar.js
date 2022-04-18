import React from 'react'
import PersonalJarSidebar from './PersonalJarSidebar'
import pic from '../Jars/eJar.jpg'

const PersonalJar = () => {
    const currJarInfo = JSON.parse(localStorage.getItem('currentJar'));
  return (
    <div>
        <PersonalJarSidebar/>
        <h1>{currJarInfo.name} Jar</h1>
        <img src={pic}/>
    </div>
  )
}

export default PersonalJar
