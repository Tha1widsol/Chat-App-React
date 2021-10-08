import React,{useRef} from 'react'
import { useHistory } from "react-router-dom";

export default function User({user}) {
    const SearchRef = useRef()

    let history = useHistory()

    function HandleSubmit(e){
        
        const SearchVal = SearchRef.current.value

        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body : JSON.stringify({
                username: SearchVal
            })
        };

        fetch('/api/search',requestOptions)
        .then((response) =>
        response.json())
        .then((data) => console.log(data))
        
    
        
    }

    return (
        <div className = 'container'>
            <h2>{user.username} </h2> 
            <form action="/action_page.php" method="get" class="example">
                    <input type="search" ref={SearchRef} placeholder="Search" id="search" autofocus = "autofocus" name="search_string" aria-label="Search" />   
                    <button onClick={HandleSubmit}>Submit</button>
            </form>

          
        
           
        </div>
    )
}
