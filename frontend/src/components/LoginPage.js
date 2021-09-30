import React,{useState,useEffect,useRef} from 'react'
import { useHistory } from "react-router-dom";

export default function LoginPage() {
    const UsernameRef = useRef()
    const PasswordRef = useRef()

    let history = useHistory();

    function HandleSubmit(e){
        const username = UsernameRef.current.value
        const password = PasswordRef.current.value

        const requestOptions = {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        };
    
            fetch('/api/auth/login',requestOptions)
            .then(response => {
                if(!response.ok){
                    throw Error("Error")
                
                }
                return response.json()
            })
    
            .then(data => {
                localStorage.setItem('token',data.token)
                history.push('/')
                window.location.reload(false);
            })
            
            .catch(error => {
                console.log(error.message)
            })
    }

    return (
    <div>
    
        <label><p>Username:</p></label>
        <input type='text' ref={UsernameRef} placeholder='Username...'/>
    
        <label><p>Password:</p></label>
        <input type='password' ref={PasswordRef} placeholder='Password...'/>
        <br/>
        <br/>
        <button type="submit" onClick={HandleSubmit}>Submit</button>

    </div>
    )
}
