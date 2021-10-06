import React from 'react'
import {BrowserRouter as Router,Switch,Route} from "react-router-dom"
import RegisterPage from './RegisterPage'
import LoginPage from './LoginPage'
import HomePage from './HomePage'

export default function Routes() {
    return (
    
            <Router>
                <Switch>
                    <Route exact path='/' component={HomePage}></Route>
                    <Route exact path='/home' component={HomePage}></Route>
                    <Route path='/register' component={RegisterPage}></Route>
                    <Route path='/sign_in' render={() => <LoginPage/>} />
                
                </Switch>
            </Router>
    )
}
