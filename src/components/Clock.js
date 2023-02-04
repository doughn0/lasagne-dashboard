import { useState, useEffect } from 'react';
import "../css/clock.css";

function Clock({maximized}){

  console.log(maximized);

  function renderTime(){
    return (new Date()).toLocaleTimeString('en-US', {hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit'});
  }
  const [time, setTime] = useState(renderTime());

  function refreshClock() {
    setTime(renderTime());
  }
  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);
  return (
    <div className={(maximized ? 'maximized ' : '') + 'clock'} >
      <span className={(maximized ? 'maximized ' : '') + 'hoursminutes'} >{time.substring(0,5)}</span>
      <span className={(maximized ? 'maximized ' : '') + 'seconds'} >{time.substring(5)}</span>
      <span className={(maximized ? 'maximized ' : '') + 'hack'} >{time.substring(5)}</span>
    </div>
  );
}

export default Clock;