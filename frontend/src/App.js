import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import JarsPage from './components/Jars/JarsPage';
import MainPage from './pages/MainPage';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<MainPage/>} />
          <Route path='/jar-collections' element={<JarsPage/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;