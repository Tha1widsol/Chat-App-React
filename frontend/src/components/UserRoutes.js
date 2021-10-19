import React from 'react'
import {BrowserRouter as Router,Switch,Route} from "react-router-dom"
import SearchPage from './SearchPage'
import UserNav from './UserNav'
import ChatPage from './ChatPage'
import RequestsPage from './RequestsPage'
import SentPage from './SentPage'

export default function UserRoutes({logged_in_user}) {
    return (
        <div>
            <h2>{logged_in_user.username} </h2> 
            <div id="user-container">
                <UserNav/>
                <br/>
                <hr className="mt-0-mb-4"/>

                <Router>
                    <Switch>
                        <Route exact path='/' render ={() => <ChatPage/>} />
                        <Route path='/search' render={() => <SearchPage logged_in_user = {logged_in_user}/>} />
                        <Route exact path='/requests' render ={() => <RequestsPage/>} />
                        <Route exact path='/sent' render ={() => <SentPage/>} />

                    
                    </Switch>
                 </Router>
            </div>
      </div>
    )
}
