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
                <div className="">
                    <div className="hcontainer flex-between" style={{width: '200px'}}>
                        <WCodeIcon className="icon" size={90} code={data.current_weather.weathercode}/>
                        <Temp degrees={data.current_weather.temperature} style={{ fontSize: '50px', marginRight: '15px' }} />
                    </div>
                    <BarGraph timestamp={data.current_weather.time} data={data.hourly}/>
                </div>
            </div>)
        :
        "Loading"
    }
    </>
}

function BarGraph({timestamp, data}){

    let hours = 19;
    let times = 4;
    let temps_disp = 4;
    let height = 69;
    let bottom_offset = 5;

    let dataSubset = []
    
    for (let i = 0; i < data.time.length; i++) {
        if(data.time[i].localeCompare(timestamp) > 0){
            if(dataSubset.push([data.time[i].substring(11), data.temperature_2m[i]]) === hours){
                break;
            }
        }
    }

    let cData = {
        vlabels: [],
        hlabels: [],
        heights: []
    }

    let temps = dataSubset.map(a=>(a[1]));

    let min_temp = Math.min(...temps);
    let max_temp = Math.max(...temps);
    let rng_temp = max_temp - min_temp;
    let stp_temp = Math.round(rng_temp / (temps_disp-1)) + 1;
    let bot_temp = Math.floor(min_temp - 1)

    for(let i = 0; i < temps_disp; i++) {
        cData.vlabels.push(bot_temp + (temps_disp-i-1)*stp_temp);
    }

    for (let i = 0; i < dataSubset.length; i++) {
        const e = dataSubset[i];
        if(i % ((hours-1) / (times-1)) === 0){
            cData.hlabels.push(e[0]);
        }
        cData.heights.push(((e[1]-bot_temp) / (stp_temp*3)) * height + bottom_offset);
    }

    return <div className="hcontainer flex-align-start flex-start" style={{fontSize:'12px', position: 'relative', width: '200px', height: '90px'}}>
        <div className="">
            {cData.vlabels.map(vlabel => (
                <div className="vcontainer flex-align-end" style={{width: '30px', height: '23px'}}>
                    <Temp degrees={ vlabel } style={{ fontSize: '14px'}} />
                    <div className="w-hr"></div>
                </div>
            ))}
        </div>
        <div className="vcontainer" style={{width: '155px', height: '105px'}}>
            <div className="hcontainer flex-align-end flex-between" style={{width: '130px', height: '85px', paddingLeft:'15px', paddingRight:'10px'}}> 
                {cData.heights.map((height, i) => (
                    <div className="w-bar-container hcontainer flex-align-end"style={{maxHeight: height + 'px', transitionDelay: (i/20)+'s'}}>
                        <div className="w-bar" style={{animationDelay: (i/20)+'s'}}/>
                    </div>
                ))}
            </div>
            <div className="hcontainer flex-align-end flex-between" style={{width: '170px', height: '20px', marginLeft:'-5px'}}>
                {cData.hlabels.map(hlabel => (
                    <div className="w-clock vcontainer flex-align-center" style={{width: '40px', height: '19px'}}>{hlabel}</div>
                ))}
            </div>
        </div>
    </div>
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