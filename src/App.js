import { useState } from 'react';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import LoginModal from './components/Modal';
import Main from './pages/Main';

function App() {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <div className="App">
      <Header setShowModal={setShowModal}/>
      <LoginModal setShowModal={setShowModal} showModal={showModal}/>
      <Main />
      <Footer />
    </div>
  );
}

export default App;
