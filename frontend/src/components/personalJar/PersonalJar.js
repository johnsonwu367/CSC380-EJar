import React from 'react'
import PersonalJarSidebar from './PersonalJarSidebar'
import pic from '../Jars/eJar.jpg'
import JarOpeningSidebar from '../JarOpeningSidebar';

const PersonalJar = () => {
    const currJarInfo = JSON.parse(localStorage.getItem('currentJar'));
  return (
    currJarInfo.status==="openable" ?
      <div>
        <JarOpeningSidebar/>
        <h1>{currJarInfo.name} Jar</h1>
        <h5>Hooray, the Jar opening time is up! Click on "Open Jar" to view the contents in the jar!</h5>
        <img src={pic} alt=''/>
      </div>
      :
      <div>
        <PersonalJarSidebar/>
        <h1>{currJarInfo.name} Jar</h1>
        <img src={pic} alt=''/>
      </div>
  )
}

export default PersonalJar
