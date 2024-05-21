import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import Message from './Message';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableTimes, setAvailableTimes] = useState([]);
  const [showGenerateButton, setShowGenerateButton] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  const [showTimes, setShowTimes] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>&#60;</button>
        <h2 className="text-lg font-bold">{format(currentMonth, 'MMMM yyyy')}</h2>
        <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>&#62;</button>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const date = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="text-center font-medium" key={i}>
          {date[i]}
        </div>
      );
    }
    return <div className="grid grid-cols-7 mb-2">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, 'd');
        const cloneDay = day;
        days.push(
          <div
            className={`p-2 text-center cursor-pointer ${!isSameMonth(day, monthStart) ? 'text-gray-400' : ''} ${
              isSameDay(day, selectedDate) ? 'bg-orange-500 text-white' : ''
            }`}
            key={day}
            onClick={() => handleDayClick(cloneDay)}
          >
            <span>{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div>{rows}</div>;
  };

  const handleDayClick = (day) => {
    setSelectedDate(day);
    const times = ["08:00 hs", "10:00 hs", "12:00 hs", "14:00 hs", "16:00 hs", "18:00 hs"];
    setAvailableTimes(times);
    setShowGenerateButton(true);
    setSelectedTime('');
    setShowTimes(true);
    setMessage('');
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time);
    console.log("Se ha seleccionado el horario:", time);
  };

  const handleGenerateClick = () => {
    if (selectedTime) {
      const generatedMessage = `Cita generada el ${format(selectedDate, 'yyyy-MM-dd')} a las ${selectedTime}`;
      console.log(generatedMessage);
      setMessage(generatedMessage);
      setMessageType('success');
    } else {
      const errorMessage = 'Por favor, seleccione un horario para generar la sesión.';
      console.log(errorMessage);
      setMessage(errorMessage);
      setMessageType('error');
    }
  };

  const handleToggleTimes = () => {
    setShowTimes(!showTimes);
  };

  const renderAvailableTimes = () => {
    return (
      <div className="mt-4 border rounded-lg overflow-hidden">
        <div className="flex justify-between items-center bg-orange-500 text-white font-semibold px-4 py-2">
          <p>Horarios disponibles para {format(selectedDate, 'MMMM d, yyyy')}:</p>
          <button onClick={handleToggleTimes} className="ml-4 bg-orange-700 hover:bg-orange-800 active:bg-orange-900 py-1 px-2 rounded">
            {showTimes ? 'Ocultar' : 'Mostrar'}
          </button>
        </div>
        {showTimes && (
          <ul>
            {availableTimes.map((time, index) => (
              <li
                className={`px-4 py-2 border-t cursor-pointer ${selectedTime === time ? 'bg-orange-200' : 'hover:bg-orange-100 active:bg-orange-200'}`}
                key={index}
                onClick={() => handleTimeClick(time)}
              >
                {time}
              </li>
            ))}
          </ul>
        )}
        {showTimes && showGenerateButton && (
          <button
            className="bg-orange-500 text-white font-semibold py-2 px-4 w-full hover:bg-orange-600 active:bg-orange-700 cursor-pointer"
            onClick={handleGenerateClick}
          >
            Generar Sesión
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="w-full max-w-md mx-auto mt-4 p-4 border rounded-lg shadow-lg bg-white text-black">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
      {availableTimes.length > 0 && renderAvailableTimes()}
      {message && <Message message={message} type={messageType} />}
    </div>
  );
};

export default Calendar;
