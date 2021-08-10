import React,{Component} from "React";
import {render} from "react-dom";
import HomePage from "./HomePage";

export default function App(){
        return <HomePage/>;
}

const appDiv = document.getElementById("app");
render(<App/>, appDiv);