// src/components/Message.jsx
import React from 'react';

const Message = ({ message, type }) => {
  const messageStyle = type === 'success' 
    ? 'bg-green-100 text-green-700' 
    : 'bg-red-100 text-red-700';

  return (
    <div className={`mt-4 p-4 border rounded-lg shadow-lg ${messageStyle}`}>
      <p>{message}</p>
    </div>
  );
};

export default Message;
