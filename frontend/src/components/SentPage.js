import React,{useState,useEffect} from 'react'
import Messages from './Messages'

export default function SentPage() {
    const [users,setUsers] = useState([])
    const [messages,setMessages] = useState({arr:[],type:''})

    useEffect(() => {

        const requestOptions = {
            headers: {'Content-Type': 'application/json', Authorization:`Token ${localStorage.getItem('token')}`}
        }

        fetch('/api/sent',requestOptions).then((response) => 
        response.json()

       ).then((data) => {
            setUsers(data)
       });

    },[users])

    function HandleUnsendFriendRequest(id){
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', Authorization:`Token ${localStorage.getItem('token')}`},
            body : JSON.stringify({
                friend: id
            })
        };

        fetch('/api/remove_request',requestOptions)

        .then(() =>{
            setMessages({arr:["Friend request cancelled"],type:"success"})
        })
    }

    return (
        <div>
           <Messages messages = {messages} />
           <h2>Sent</h2>
          {users.map(user => {
            return (
            <div className = 'container'>
                <p>{user.id}. {user.username}</p> <span><button onClick = {() => HandleUnsendFriendRequest(user.id)}>Unsend request</button></span>
            </div>
            )
        })}
        
        </div>
    )
}
