import React from 'react'
// import Test from './components/Test';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Main from './components/Sections/Main';
import InfoSection from './components/InfoSection/InfoSection';
import { homeObjOne } from './components/InfoSection/Data';

function App() {
  return (
    <div>
      <Router>
        <Navbar/>
        {/* <Routes>
          <Route path='/' exact />
        </Routes> */}
        {/* <Main/> */}
        {/* <InfoSection {...homeObjOne} /> */}
      </Router>
        {/* <Test/> */}
    </div>
  );
}

export default App;