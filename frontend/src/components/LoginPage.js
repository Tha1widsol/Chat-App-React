import React,{useState,useRef} from 'react'
import { useHistory } from "react-router-dom";
import Messages from './Messages';

export default function LoginPage() {
    const UsernameRef = useRef()
    const PasswordRef = useRef()

    const [messages,setMessages] = useState({arr:[],type:''})

    let history = useHistory();

    function HandleSubmit(e){

        const username = UsernameRef.current.value
        const password = PasswordRef.current.value

        
        if(username.length == 0 || password.length == 0){
            
            setMessages(
                {arr:["Fields cannot be empty"],type:"error"}
             )
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
    
            fetch('/api/auth/login',requestOptions)
            .then(response => {
                if(!response.ok){
                    throw Error('Username or password is incorrect')

                
                }
                return response.json()
            })
    
            .then(data => {
                localStorage.setItem('token',data.token)
                history.push('/')
                window.location.reload(false);
            })
            
            .catch(error => {
                PasswordRef.current.value = null

                setMessages(
                  {arr:[error.message],type:'error'} 
                )
            })
    }

    return (
    <div>
       <Messages messages = {messages} />
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
