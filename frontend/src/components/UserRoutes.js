import React from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import SearchPage from './SearchPage'
import UserNav from './UserNav'
import ChatPage from './ChatPage'
import RequestsPage from './RequestsPage'
import SentPage from './SentPage'
import ChatRoom from './ChatRoom'


export default function UserRoutes({logged_in_user}) {
    return (
        <div>
            <div id="user-container">
                <UserNav/>
                <br/>
                <hr className="mt-0-mb-4"/>
                <Router>
                    <Routes>
                        <Route path= '/' element ={<ChatPage logged_in_user = {logged_in_user}/>} />
                        <Route path= '/home' element ={<ChatPage logged_in_user = {logged_in_user}/>} />
                        <Route path='/search' element = {<SearchPage logged_in_user = {logged_in_user}/>} />
                        <Route path='/requests' element = {<RequestsPage/>} />
                        <Route path='/sent' element = {<SentPage/>} />
                        <Route path = '/chat/:roomID/' element ={<ChatRoom  logged_in_user = {logged_in_user}/>} />
                    </Routes>
                 </Router>
            </div>
      </div>
    )
}
