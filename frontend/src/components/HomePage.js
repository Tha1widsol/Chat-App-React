import React,{useState,useEffect} from 'react'
import {BrowserRouter as Router,Switch,Route,Link,Redirect} from "react-router-dom"

export default function HomePage(){

    function renderHomePage(){

        return (
            <h1>Chat App</h1>
        );
    }

    return(
    <Router>
        <Switch>
            <Route exact path='/' component={renderHomePage}></Route>
        
        </Switch>
    </Router>);
}