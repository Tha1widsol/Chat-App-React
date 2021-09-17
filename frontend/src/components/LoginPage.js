import React,{useState,useEffect,useRef} from 'react'

export default function LoginPage() {
    const UsernameRef = useRef()
    const PasswordRef = useRef()

    function HandleSubmit(e){
        const username = UsernameRef.current.value
        const password = PasswordRef.current.value

        console.log(username)
        console.log(password)
    }
    
    return (
    <div style={{textAlign:"center"}}>
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
