import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Footer from './components/Footer';
import DoctorPage from './pages/DoctorPage';
import MainPage from './pages/MainPage';
import PatientPage from './pages/PatientPage';
import AboutPage from './pages/AboutPage';

function App() {
  
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/doctor/:id" element={<DoctorPage />} />
          <Route path="/patient/:id" element={<PatientPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
        
        
      
    </div>
  );
}

export default App;
