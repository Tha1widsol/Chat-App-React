import React  from "React";
import {render} from "react-dom";
import HomePage from "./HomePage";


export default function App(){
        return (<div className="center">
                <HomePage/>
                </div>);
}

const appDiv = document.getElementById("app");
render(<App/>, appDiv);