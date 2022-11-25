import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';

import DoctorPage from './pages/DoctorPage';
import MainPage from './pages/MainPage';
import PatientPage from './pages/PatientPage';

function App() {
  
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/doctor" element={<DoctorPage />} />
          <Route path="/patient" element={<PatientPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
        
        
      
    </div>
  );
}

export default App;
