import React from 'react'
// import Test from './components/Test';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Main from './components/Sections/Main';
import About from './components/Sections/About';
import AppFeatures from './components/Sections/AppFeatures';
import Contact from './components/Sections/Contact';

function App() {
  return (
    <div>
      <Router>
        <Navbar/>
        {/* <Routes>
          <Route path='/' exact />
        </Routes> */}
        <Main/>
        <About/>
        <AppFeatures/>
        <Contact/>
      </Router>
        {/* <Test/> */}
    </div>
  );
}

export default App;