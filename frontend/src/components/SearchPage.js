import React,{useState,useRef} from 'react'
import { useHistory } from "react-router-dom";
import Messages from './Messages';

export default function SearchPage({logged_in_user}) {
    const SearchRef = useRef()

    let history = useHistory()

    const [messages,setMessages] = useState({arr:[],type:''})

    const [users,setUsers] = useState([])

    const searchedUsers = () => {
        return users.filter(user => user.username !== logged_in_user.username)
    }

    function HandleAddFriend(id){
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', Authorization:`Token ${localStorage.getItem('token')}`},
            body : JSON.stringify({
                friends: id
            })
        };

        fetch('/api/add',requestOptions)
        .then((response)=> {
            if(response.ok){
                setMessages({arr:['Friend added'],type:'success'}) 
            }

            else{
                setMessages({arr:['Friend already added'],type:'error'}) 
            }
           
        })
  
    }

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
        <div>
            <Messages messages = {messages} />
            <h2>Search</h2>
            <form action="#" method="post">
                    <input type="search" ref={SearchRef} placeholder="Search..." id="search" autofocus = "autofocus" name="search_string" aria-label="Search" />   
                    <button onClick={HandleSubmitSearch}>Submit</button>
            </form>  

        {searchedUsers().map(user => {
          return (
              <div className = 'container'>
                <p> {user.id}. {user.username}</p> <span><button onClick = {() => HandleAddFriend(user.id)}>Add friend</button></span>
              </div>
          )
      })}
           
       </div>
    )
}
