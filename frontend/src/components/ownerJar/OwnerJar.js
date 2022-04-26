import React from 'react'
import OwnerJarSidebar from './OwnerJarSidebar'
import pic from '../Jars/eJar.jpg'
import JarOpeningSidebar from '../JarOpeningSidebar';

const OwnerJar = () => {
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
        <OwnerJarSidebar/>
        <h1>{currJarInfo.name} Jar</h1>
        <img src={pic}/>
      </div>
  )
}

export default OwnerJar
