import React from 'react'
import pic from '../Jars/eJar.jpg'
import ContributingJarSidebar from './ContributingJarSidebar';

const ContributingJar = () => {
    const currJarInfo = JSON.parse(localStorage.getItem('currentJar'));
    return (
      <div>
          <ContributingJarSidebar/>
          <h1>{currJarInfo.name} Jar</h1>
          <img src={pic}/>
      </div>
    )
}

export default ContributingJar
