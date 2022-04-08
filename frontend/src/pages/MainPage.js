import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import About from '../components/Sections/About'
import AppFeatures from '../components/Sections/AppFeatures'
import Contact from '../components/Sections/Contact'
import Main from '../components/Sections/Main'

const MainPage = () => {
  return (
    <div>
      <Navbar/>
      <Main/>
      <About/>
      <AppFeatures/>
      <Contact/>
    </div>
  )
}

export default MainPage
