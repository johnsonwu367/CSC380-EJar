import React from 'react'
import OwnerJarSidebar from './OwnerJarSidebar'
import pic from '../Jars/eJar.jpg'

const OwnerJar = () => {
  const currJarInfo = JSON.parse(localStorage.getItem('currentJar'));
  return (
    <div>
      <OwnerJarSidebar/>
      <h1>{currJarInfo.name} Jar</h1>
      <img src={pic}/>
    </div>
  )
}

export default OwnerJar
