import React,{Component,component} from 'react'
import {BrowserRouter as Router,Switch,Route,Link,Redirect} from "react-router-dom"
import AboutPage from './AboutPage';
export default function HomePage(){
    return(
    <Router>
        <Switch>
            <Route exact path='/'> <p>Home page</p></Route>
            <Route path='/about' component={AboutPage}/>
        </Switch>
    </Router>);
}