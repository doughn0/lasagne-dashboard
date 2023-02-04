import { useEffect, useState } from "react";
import Clock from "./components/Clock";
import Tile from "./components/Tile"
import "./css/dashboard.css";
import FPSStats from "react-fps-stats";

function Dashboard() {

    let [active, setActiveInt] = useState("");
    let [timeoutId, setTimeoutId] = useState("");
    let sel = 0;

    function resetActive(){
        console.log("reset");
        setActiveInt("");
    }

    function setActive(s){
        console.log(s);
        clearTimeout(timeoutId);
        setActiveInt(s);
        setTimeoutId(setTimeout(resetActive, 20000));
    }

    return  <div className="container">
                <Tile id={"l_tile-"+sel++} active={active} setActive={setActive} x={0} y={0} />
                <Tile id={"l_tile-"+sel++} active={active} setActive={setActive} x={1} y={0} />
                <Tile id={"l_tile-"+sel++} active={active} setActive={setActive} x={2} y={0} >
                </Tile>
                <Tile id={"l_tile-"+sel++} active={active} setActive={setActive} x={0} y={1} blockSize={ 2 } >
                    <Clock/>
                </Tile>
                <Tile id={"l_tile-"+sel++} active={active} setActive={setActive} x={2} y={1} />
                ({(!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? <FPSStats/> : null })
                <FPSStats/>
            </div>
}

export default Dashboard;