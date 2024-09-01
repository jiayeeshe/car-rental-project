// src/App.js
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const Test = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div>
      <h1>Select a Date</h1>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
    </div>
  );
}

