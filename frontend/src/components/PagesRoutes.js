import React from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import RegisterPage from './RegisterPage'
import LoginPage from './LoginPage'
import HomePage from './HomePage'
import UserRoutes from './UserRoutes'

export default function PagesRoutes({user}) {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path = '/' element = {user.logged_in ? null : <HomePage/>}/>
                    <Route path = '/home' element = {user.logged_in ? null : <HomePage/>}/>
                    <Route path='/register/' element = {<RegisterPage/>}></Route>
                    <Route path='/login/' element ={<LoginPage/>} />
                </Routes>
            </Router>

            { user.logged_in ? <UserRoutes logged_in_user = {user}/> : null}

        </div>

    )
}
