import React,{useState,useEffect}  from "react";
import {render} from "react-dom";
import Navbar from "./Navbar";
import Routes from "./Routes";

export default function App(){
        const [user,setUser] = useState({
                logged_in: localStorage.getItem('token') ? true : false,
                username: ""
            })
            const [popup,setPopup] = useState(false)

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
                            handleLogout()
                        }

                    })

                  
                }
                
               
             },[])

        
        function handleSetPopup(p){
            setPopup(p)
        }

        function handleLogout(){
                localStorage.removeItem('token');
                setUser({ logged_in: false, username: '' });
            }
           
        return (
            <div id = {popup ? 'modal-background' : null}>
               <Navbar user = {user} handleLogout = {handleLogout}/>
                <div className="center"><Routes user = {user} handleSetPopup = {handleSetPopup}/></div>
                        
            </div>
            
            );

            
}

const appDiv = document.getElementById("app");
render(<App/>, appDiv);

