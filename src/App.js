import { useState } from 'react';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import PopupModal from './components/Modal';
import Doctor from './pages/Doctor';
import Main from './pages/Main';

function App() {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <div className="App">
      <Header setShowModal={setShowModal}/>
      <PopupModal setShowModal={setShowModal} showModal={showModal}/>
      <Main />
      <Doctor />
      <Footer />
    </div>
  );
}

export default App;
