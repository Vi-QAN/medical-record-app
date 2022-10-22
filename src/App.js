import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import LoginModal from './components/LoginModal';

function App() {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <div className="App">
      <Header setShowModal={setShowModal}/>
      <LoginModal setShowModal={setShowModal} showModal={showModal}/>
    </div>
  );
}

export default App;
