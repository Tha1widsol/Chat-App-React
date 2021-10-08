import React,{useState,useRef} from 'react'
import { useHistory } from "react-router-dom";
import Messages from './Messages';

export default function UserPage({user}) {
    const SearchRef = useRef()

    let history = useHistory()

    const [messages,setMessages] = useState({arr:[],type:''})

    const [users,setUsers] = useState([])

    function HandleSubmitSearch(e){
        e.preventDefault()
        const SearchVal = SearchRef.current.value

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body : JSON.stringify({
                search_string: SearchVal
            })
        };

        fetch('/api/search',requestOptions)
        .then((response) => response.json())       
        .then(data => {
            if (data.length > 0){
                setUsers(data)
                setMessages({arr:[],type:''})
            }

            else{
                 setMessages({arr:['No users found'+ ' for' + " '" + SearchVal + " '"],type:'error'})
            }
        })
    }

    return (
        <div className = 'container'>
            <Messages messages = {messages} />
            <h2>{user.username} </h2> 
            <form action="#" method="post">
                    <input type="search" ref={SearchRef} placeholder="Search..." id="search" autofocus = "autofocus" name="search_string" aria-label="Search" />   
                    <button onClick={HandleSubmitSearch}>Submit</button>
            </form>  

    <br/>


    {users.map(user => {
          return (
              <div className = 'container'>
                <p> {user.id}. {user.username}</p>
              </div>
          )
      })}
           
        </div>
    )
}
