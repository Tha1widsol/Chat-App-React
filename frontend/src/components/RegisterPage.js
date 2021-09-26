import React,{useState,useEffect,useRef} from 'react'
import axios from 'axios';

export default function RegisterPage() {
    const UsernameRef = useRef()
    const PasswordRef = useRef()
    const ConfirmPasswordRef = useRef()

    function HandleSubmit(e){
        const username = UsernameRef.current.value
        const password = PasswordRef.current.value
        const Confirmpassword = ConfirmPasswordRef.current.value

        if (password != Confirmpassword) return


        const requestOptions = {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        };

        fetch('/api/auth/register',requestOptions)
        .then(response => {
            if(!response.ok){
                throw Error("Error")
            
            }
            return response.json()
        })

        .then((data) => console.log(data))
        
        .catch(error => {
            console.log(error.message)
        })

        console.log(username)
        console.log(password)
        console.log(Confirmpassword)

    }
    
    


    return (
        <div style={{textAlign:"center"}}>
            <label><p>Username:</p></label>
            <input type='text' ref={UsernameRef} placeholder='Username...'/>
        
            <label><p>Password:</p></label>
            <input type='password' ref={PasswordRef} placeholder='Password...'/>
        
            <label><p>Confirm password:</p></label>
            <input type='password' ref={ConfirmPasswordRef} placeholder='Confirm password...'/>
            <br/>
            <br/>
            <button type="submit" onClick={HandleSubmit}>Submit</button>

        </div>
    )
}
