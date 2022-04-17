import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ContributingJar from './components/contributingJar/ContributingJar';
import JarsPage from './components/Jars/JarsPage';
import OwnerJar from './components/ownerJar/OwnerJar';
import PersonalJar from './components/personalJar/PersonalJar';
import MainPage from './pages/MainPage';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<MainPage/>} />
          <Route path='/jar-collections' element={<JarsPage/>} />
          <Route path='/personal-jar' element={<PersonalJar/>} />
          <Route path='/shared-jar' element={<OwnerJar/>} />
          <Route path='/contributing-jar' element={<ContributingJar/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;