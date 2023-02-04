import { useState } from "react";
import Clock from "./components/Clock";
import Tile from "./components/Tile"
import "./css/dashboard.css";

function Dashboard() {

    let [active, setActive] = useState("");
    let sel = 0;

    return  <div className="container">
                <Tile id={"l_tile-"+sel++} active={active} setActive={setActive} x={0} y={0} />
                <Tile id={"l_tile-"+sel++} active={active} setActive={setActive} x={1} y={0} />
                <Tile id={"l_tile-"+sel++} active={active} setActive={setActive} x={2} y={0} />
                <Tile id={"l_tile-"+sel++} active={active} setActive={setActive} x={0} y={1} blockSize={ 2 } >
                    <Clock/>
                </Tile>
                <Tile id={"l_tile-"+sel++} active={active} setActive={setActive} x={2} y={1} />
            </div>
}

export default Dashboard;