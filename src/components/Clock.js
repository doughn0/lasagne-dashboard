import { useState, useEffect } from 'react';
import "../css/clock.css";

function Clock(){

  function renderDate(){
    return (new Date()).toLocaleTimeString('en-US', {hour12: false, hour: '2-digit', minute:'2-digit'});
  }
  const [date, setDate] = useState(renderDate());

  function refreshClock() {
    setDate(renderDate());
  }
  useEffect(() => {
    const timerId = setInterval(refreshClock, 60000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);
  return (
    <div className='clock' >
      {date}
    </div>
  );
}

export default Clock;