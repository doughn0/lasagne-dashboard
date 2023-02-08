import { useState, useEffect } from 'react';
import "../css/clock.css";

function Clock({maximized}){
	function renderTime(){
		return (new Date()).toLocaleTimeString('hu-HU', {hour: '2-digit', minute:'2-digit', second:'2-digit'});
	}
	const [time, setTime] = useState(renderTime());
	const [date, setDate] = useState(new Date());

	function refreshClock() {
		setTime(renderTime());
        setDate(new Date());
	}

	useEffect(() => {
		const timerId = setInterval(refreshClock, 100);
		return function cleanup() {
			clearInterval(timerId);
		};
	}, []);
	return <div className={(maximized ? 'maximized ' : '') + 'clock'} >
            <div className='hcontainer flex-center'>
                <span className={(maximized ? 'maximized ' : '') + 'hoursminutes'} >{time.substring(0,5)}</span>
                <span className={(maximized ? 'maximized ' : '') + 'seconds'} >{time.substring(5)}</span>
                <span className={(maximized ? 'maximized ' : '') + 'hack'} >{time.substring(5)}</span>
            </div>
            <div className={(maximized ? 'maximized ' : '') + 'date'} >
                {date.toLocaleDateString('hu-HU')}
            </div>
        </div>;
}

export default Clock;