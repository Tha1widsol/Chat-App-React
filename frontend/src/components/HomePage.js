import React from 'react'
import {Helmet} from 'react-helmet'

export default function HomePage(){
        return (
        <div style={{textAlign:"center"}}>
            <Helmet>
            <title>Home</title>
            </Helmet>
            <h1>Chat App</h1>
            <a href='/register'><button>Register</button></a>
            <br/>
            <br/>
            <a href='/login/'><button>Login</button></a>
        </div>
        );
    }



