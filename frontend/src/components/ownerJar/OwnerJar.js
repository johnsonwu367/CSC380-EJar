import React from 'react';
import OwnerJarSidebar from './OwnerJarSidebar';
import pic from '../Images/Empty_EJar_2.png';
import JarOpeningSidebar from '../JarOpeningSidebar';

const OwnerJar = () => {
  const currJarInfo = JSON.parse(localStorage.getItem('currentJar'));
  return (
    currJarInfo.status==="openable" ?
      <div>
        <JarOpeningSidebar/>
        <div className='contentsContainer'>
          <div className='jarHeading'>
            <div className='headingContents'>
              <h1>{currJarInfo.name} Jar</h1>
              <h4>Hooray, the Jar opening time is up! Click on "Open Jar" to view the contents in the jar!</h4>
            </div>
          </div>
          <div className='jarImg'>
            <img src={pic} alt=''/>
          </div>
        </div>
      </div>
      :
      <div>
        <OwnerJarSidebar/>
        <div className='contentsContainer'>
          <div className='jarHeading'>
            <div className='headingContents'>
              <h1>{currJarInfo.name} Jar</h1>
              <h4>Click on "Add Jar Content" to add some beautiful memories to the jar!</h4>
            </div>
          </div>
          <div className='jarImg'>
            <img src={pic} alt=''/>
          </div>
        </div>
      </div>
  )
}

export default OwnerJar
