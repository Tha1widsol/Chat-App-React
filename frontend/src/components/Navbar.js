import React from 'react'

export default function Navbar({user,handleLogout}) {
    return (
        <div id="navbar">
            <a href='/'>Chat App</a>
            <a href='/home'>Home</a>
            <a href="/about" >About</a>
            <a href="/contact" >Contact</a>
            {user.logged_in ? <a href='/' onClick={handleLogout}>Logout</a> : <> <a href="/register" >Register</a>  <a href="/login/" >Login</a> </> }
            {user.logged_in ? <a>Logged in as, {user.username} </a> : null} 

        </div>
    )
}
