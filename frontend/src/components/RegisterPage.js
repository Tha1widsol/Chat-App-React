import React,{useState,useEffect,useRef} from 'react'
import { useHistory } from "react-router-dom";
import Messages from './Messages';

export default function RegisterPage() {
    const UsernameRef = useRef()
    const PasswordRef = useRef()
    const ConfirmPasswordRef = useRef()

    const [messages,setMessages] = useState([])

    let history = useHistory();

    function HandleSubmit(e){
        const username = UsernameRef.current.value
        const password = PasswordRef.current.value
        const Confirmpassword = ConfirmPasswordRef.current.value

        const notMatchingPasswords = "Passwords don't match"

        if (password !== Confirmpassword) {
            setMessages(prevState => {
                return [...prevState,{text:notMatchingPasswords,type:"error"}]
            })
            return  
        }

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
            <Messages messages = {messages} />

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
