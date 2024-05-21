import React from 'react';
import Calendar from './components/calendar';
import MainH1 from './components/MainH1';
function App() {
  return (
    <div className="App min-h-screen flex items-center flex-col justify-center">
      <MainH1>Agendar una cita!</MainH1>
      <Calendar className="my-3"/>
    </div>
  );
}

export default App;
