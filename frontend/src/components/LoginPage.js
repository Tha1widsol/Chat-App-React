import React,{useState,useEffect,useRef} from 'react'

export default function LoginPage() {
    const UsernameRef = useRef()
    const PasswordRef = useRef()

    const [user,setUser] = useState({
        logged_in: localStorage.getItem('token') ? true : false,
        username: ""
    })

    useEffect(() => {
        if(user.logged_in){
            fetch('/api/current_user',{
                headers: {
                    Authorization:`Token ${localStorage.getItem('token')}`
                }
            })

            .then(response => response.json())
            .then(data => {
                setUser({username:data.username,logged_in:true})
                console.log(data)
            })
        }
       
     },[])
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
                setUser({logged_in:true, username: username})
              
            })
            
            .catch(error => {
                console.log(error.message)
            })
    }

    function handleLogout(){
        localStorage.removeItem('token');
        setUser({ logged_in: false, username: '' });
    }
   
    
    return (
    <div style={{textAlign:"center"}}>
        {user.logged_in ? <button onClick={handleLogout}>Logout</button>: null}
        <p>{user.username} </p>
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
