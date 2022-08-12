import NewRoom from "./components/newRoom";
import Header from "./components/Header"
import './App.css';
import { initializeApp } from "firebase/app";
import React, { useState } from 'react';

function App() {
  const firebaseConfig = {
    storageBucket: '',
    projectId: "gakugeki-rooms"
  };
  const app = initializeApp(firebaseConfig);
  const [roomSelect, setRoomSelect] = useState(false)
  function setTrue() {
    setRoomSelect(true)
  }
  function setFalse() {
    setRoomSelect(false)
  }
  return (
    <>
    {roomSelect && <div className="back" onClick={() => setRoomSelect(false)}></div>}
    <Header></Header>
    <NewRoom app={app} roomSelect={roomSelect} function1={setTrue} function2={setFalse}/>
    </>
  );
}

export default App;
