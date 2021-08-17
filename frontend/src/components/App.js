import React,{Component} from "React";
import {render} from "react-dom";
import HomePage from "./HomePage";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";

export default function App(){
        return (<div>
                <HomePage/>
              
                </div>);
}

const appDiv = document.getElementById("app");
render(<App/>, appDiv);