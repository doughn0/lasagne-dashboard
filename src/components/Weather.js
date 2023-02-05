import { useState, useEffect } from "react";
import { WiAlien, WiCloudy, WiDayCloudy, WiDayFog, WiDayShowers, WiDaySunny, WiDaySunnyOvercast, WiFog } from "weather-icons-react";
import "../css/weather.css";

function Weather({maximized}){
    const url = "https://api.open-meteo.com/v1/forecast?latitude=47.48&longitude=19.08&hourly=temperature_2m,relativehumidity_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&timezone=auto"
    let [data, setData] = useState({});

    async function getData(){
        let resp = await (await fetch(url)).json()
        return resp;
    }

    async function updateData(){
        setData(await getData());
    }

    useEffect(() => {
        setTimeout(updateData, 0);
        const timerId = setInterval(updateData, 600000);
        return function cleanup() {
          clearInterval(timerId);
        };
    }, []);
    return  <>{
        data.latitude ? (
            <div className={(maximized ? 'maximized ' : '') + "w-container hcontainer flex-align-start"}>
                <div className="hcontainer flex-between" style={{width: '185px'}}>
                    <WCodeIcon className="icon" size={90} code={data.current_weather.weathercode}/>
                    <Temp degrees={data.current_weather.temperature} style={{ fontSize: '50px' }} />
                </div>
            </div>)
        :
        "Loading"
    }
    </>
}

function Temp({degrees, ...props}){

    let value = Math.round(degrees)+"";

    return <div className="w-temp" {...props}>
        <div className="hcontainer">
            <span  >
                {value}
            </span>
            <span style={{ marginLeft: "-0.3em", fontSize: '0.5em', position: 'relative', bottom: '0.75em'}}>
                °C
            </span>
        </div>
    </div>
}

function WCodeIcon(props){
    let code = props.code;
    if ([0].includes(code)){
        return <WiDaySunny {...props} />
    }
    else if ([1,2].includes(code)){
        return <WiDayCloudy {...props} />
    }
    else if ([3].includes(code)){
        return <WiDaySunnyOvercast {...props} />
    }
    else if ([45].includes(code)){
        return <WiDayFog {...props} />
    }
    else if ([48].includes(code)){
        return <WiFog {...props} />
    }
    else if ([51, 53, 55].includes(code)){
        return <WiDayShowers {...props} />
    }
    else {
        return <WiAlien {...props} />
    }
}

export default Weather;