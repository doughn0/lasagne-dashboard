import { useState } from "react";
import Clock from "./components/Clock";
import Tile from "./components/Tile"
import "./css/dashboard.css";
import FPSStats from "react-fps-stats";
import Weather from "./components/Weather";

function Dashboard() {

    let [active, setActiveInt] = useState("");
    let [timeoutId, setTimeoutId] = useState("");
    let sel = 0;

    function resetActive(){
        setActiveInt("");
    }

    function setActive(s){
        clearTimeout(timeoutId);
        setActiveInt(s);
        setTimeoutId(setTimeout(resetActive, 20000));
    }

    return  <div className="container" onKeyDownCapture={(e) => console.log(e)}>
                <Tile id={"l_tile-"+sel++} active={active} setActive={setActive} x={0} y={0} >
                    <Weather/>
                </Tile>
                <Tile id={"l_tile-"+sel++} active={active} setActive={setActive} x={1} y={0} />
                <Tile id={"l_tile-"+sel++} active={active} setActive={setActive} x={2} y={0} >
                </Tile>
                <Tile id={"l_tile-"+sel++} active={active} setActive={setActive} x={0} y={1} blockSize={ 2 } >
                    <Clock/>
                </Tile>
                <Tile id={"l_tile-"+sel++} active={active} setActive={setActive} x={2} y={1} >
                </Tile>
                {(!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? <FPSStats/> : null }
            </div>
}

export default Dashboard;