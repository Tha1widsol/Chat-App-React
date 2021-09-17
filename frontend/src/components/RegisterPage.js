import React,{useState,useEffect,useRef} from 'react'

export default function RegisterPage() {
    const UsernameRef = useRef()
    const PasswordRef = useRef()
    const ConfirmPasswordRef = useRef()

    function HandleSubmit(e){
        const username = UsernameRef.current.value
        const password = PasswordRef.current.value
        const Confirmpassword = ConfirmPasswordRef.current.value

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
