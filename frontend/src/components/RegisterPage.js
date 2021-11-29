import React,{useState,useRef} from 'react'
import { useHistory } from "react-router-dom";
import Errors from './Errors';

export default function RegisterPage() {
    const UsernameRef = useRef()
    const PasswordRef = useRef()
    const ConfirmPasswordRef = useRef()

    const [errors,setErrors] = useState([])

    let history = useHistory();
    
   const validateForm = (username,password) => {
        let errors = []
        let isValid = true
        const numbers = /[0-9]/g
        const symbols = /[!£$%^&*()]/g
        const upper = /[A-Z]/g

        const Confirmpassword = ConfirmPasswordRef.current.value

        
        if(username.length == 0 || password.length == 0 || Confirmpassword.length == 0){
            errors.push('Fields cannot be empty')
            isValid = false
             
        }

        if (username.length < 9){
            errors.push('Username must be atleast 9 characters long')
            isValid = false
        }

        if (password.length < 9){
            errors.push('Password must be atleast 9 characters long')
            isValid = false
        }

        if(!password.match(numbers)){
            errors.push('Password must contain atleast one number')
            isValid = false
        }

        if(!password.match(symbols)){
            errors.push('Password must contain atleast one symbol')
            isValid = false
        }

        if(!password.match(upper)){
            errors.push('Password must contain atleast one uppercase')
            isValid = false
        }

        if (password !== Confirmpassword){
            errors.push('Passwords must match')
            isValid = false
          

        }

        if (!isValid){
            setErrors(errors)
            return
            
        }

        return isValid
    }


    function HandleSubmit(e){
        const username = UsernameRef.current.value
        const password = PasswordRef.current.value
        const UserExists = 'Username is already taken'

        if(!validateForm(username,password)) return
        
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
                throw Error(UserExists)
            }
            return response.json()
        })

        .then(data => {

        localStorage.setItem('token',data.token)
        history.push('/')
        window.location.reload(false);
            
        })
        
        .catch(error => {
            setErrors([error.message])

        })

    }


    return (
    
        <div>
         <Errors errors = {errors} />
         
        <p>Password must contain:</p>
         <li> Atleast 9 characters </li>
         <li> Atleast one number</li>
         <li> Atleast one capital</li>
         <li> Atleast one of these symbols: !,£,$,%,^,&,*,(,) </li>


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
