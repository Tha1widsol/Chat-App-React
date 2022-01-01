import React from 'react'
import {BrowserRouter as Router,Switch,Route,Redirect} from "react-router-dom"
import RegisterPage from './RegisterPage'
import LoginPage from './LoginPage'
import HomePage from './HomePage'
import UserRoutes from './UserRoutes'

export default function Routes({user,handleSetPopup}) {
    return (
        <div>
            <Router>
                <Switch>
                <Route exact path={["/","home"]} render = {() => {
                        return user.logged_in ? null : <HomePage/>
                    }}/>
                    <Route path='/register/' component={RegisterPage}></Route>
                    <Route path='/login/' render={() => <LoginPage/>} />
                </Switch>
            </Router>

            { user.logged_in ? <UserRoutes logged_in_user = {user} handleSetPopup = {handleSetPopup}/> : null}

        </div>

    )
}
