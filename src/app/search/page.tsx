'use client';
import React, { useState } from 'react';

const Page = () => {
  const [date, setDate] = useState('');
  const [dayOfWeek, setDayOfWeek] = useState('');

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const handleButtonClick = () => {
    const daysOfWeek = ['日', '月', '火', '水', '木', '金', '土'];
    const dayOfWeekIndex = new Date(date).getDay();
    setDayOfWeek(daysOfWeek[dayOfWeekIndex]);
  };

  return (
    <div>
      <input type='date' value={date} onChange={handleDateChange} />
      <button onClick={handleButtonClick}>曜日を表示</button>
      {dayOfWeek && <p>{dayOfWeek}曜日です</p>}
    </div>
  );
};

export default Page;
