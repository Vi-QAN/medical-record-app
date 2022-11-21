import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';

import DoctorPage from './pages/DoctorPage';
import MainPage from './pages/MainPage';

function App() {
  
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/doctor" element={<DoctorPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
        
        
      
    </div>
  );
}

export default App;
