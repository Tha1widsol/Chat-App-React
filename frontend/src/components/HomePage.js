import React,{Component} from 'react'
import {BrowserRouter as Router,Switch,Route,Link,Redirect} from "react-router-dom"
import AboutPage from './AboutPage';
import CreateRoomPage from './CreateRoomPage';
import RoomJoinPage from './RoomJoinPage';
import Room from './Room';

export default function HomePage(){
    return(
    <Router>
        <Switch>
            <Route exact path="/">
                <p>This is the homepage</p>
            </Route>

            <Route exact path='/join' component={RoomJoinPage}></Route>
            <Route path='/create' component={CreateRoomPage}></Route>
            <Route path='/room/:roomCode' component={Room}></Route>
        </Switch>
    </Router>);
}