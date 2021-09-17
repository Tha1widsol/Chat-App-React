import React,{useState,useEffect} from 'react'
import {BrowserRouter as Router,Switch,Route,Link,Redirect} from "react-router-dom"
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';

export default function HomePage(){

    function renderHomePage(){

        return (
            <div style={{textAlign:"center"}}>
                <h1>Chat App</h1>
                
                <a href='/register'><button>Register</button></a>
                <br/>
                <br/>
                <a href='/sign_in'><button>Login</button></a>
            </div>
        );
    }

    return (
    <Router>
        <Switch>
            <Route exact path='/' component={renderHomePage}></Route>
            <Route path='/register' component={RegisterPage}></Route>
            <Route path='/sign_in' component={LoginPage}></Route>
        
        </Switch>
    </Router>);
}