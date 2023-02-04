import { useState, useEffect } from 'react';
import "../css/clock.css";

function Clock(){
    const [date, setDate] = useState(new Date());
  
    function refreshClock() {
      setDate(new Date());
    }
    useEffect(() => {
      const timerId = setInterval(refreshClock, 60000);
      return function cleanup() {
        clearInterval(timerId);
      };
    }, []);
    return (
      <div className='clock' >
        {date.toLocaleTimeString('en-US', {hour12: false, hour: '2-digit', minute:'2-digit'})}
      </div>
    );
}

export default Clock;