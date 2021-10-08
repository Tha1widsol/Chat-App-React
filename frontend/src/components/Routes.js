import React from 'react'
import {BrowserRouter as Router,Switch,Route,Redirect} from "react-router-dom"
import RegisterPage from './RegisterPage'
import LoginPage from './LoginPage'
import HomePage from './HomePage'
import UserPage from './UserPage'

export default function Routes({user}) {

    return (
            <Router>
                <Switch>
                <Route exact path={["/","/home"]} render = {() => {
                        return user.logged_in ? (<UserPage user = {user}/>) : HomePage()
                    }}/>
                    <Route path='/register' component={RegisterPage}></Route>
                    <Route path='/sign_in' render={() => <LoginPage/>} />
                
                </Switch>
            </Router>
    )
}
