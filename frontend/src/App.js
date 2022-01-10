import React,{useState,useEffect}  from "react";
import Navbar from "./components/Navbar";
import PagesRoutes from "./components/PagesRoutes";


function App() {
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
    
    function handleLogout(){
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', Authorization:`Token ${localStorage.getItem('token')}`},
        };

        fetch('/api/auth/logout',requestOptions)
        localStorage.removeItem('token');
        setUser({ logged_in: false, username: '' });
    }

    return (
    <div>
      <Navbar user = {user} handleLogout = {handleLogout}/>
        <div className="center"><PagesRoutes user = {user}/></div>
                
    </div>

    );

}

export default App;
