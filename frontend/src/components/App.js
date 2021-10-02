import React,{useState,useEffect,useRef}  from "react";
import {render} from "react-dom";
import HomePage from "./HomePage";


export default function App(){

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

                        if (data.username){
                            setUser({username:data.username,logged_in:true})
                            console.log(data)
                        }

                        else{
                            setUser({ logged_in: false, username: '' });
                        }
                      
                    })
                }
                
               
             },[])

        function handleLogout(){
                localStorage.removeItem('token');
                setUser({ logged_in: false, username: '' });
            }
           
        
        
        return (<div className="center">
                 {user.logged_in ? <button onClick={handleLogout}>Logout</button>: null}
                 {user.logged_in ? <p>Logged in as, {user.username} </p> : null} 
                <HomePage/>
                </div>);
}

const appDiv = document.getElementById("app");
render(<App/>, appDiv);