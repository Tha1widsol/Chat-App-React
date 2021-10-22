import React,{useState,useEffect} from 'react'
import Messages from './Messages'

export default function ChatPage() {
    const [users,setUsers] = useState([])
    const [messages,setMessages] = useState({arr:[],type:''})

    useEffect(() => {

        const requestOptions = {
            headers: {'Content-Type': 'application/json', Authorization:`Token ${localStorage.getItem('token')}`}
        }

        fetch('/api/friends',requestOptions).then((response) => 
        response.json()

       ).then((data) => {
            setUsers(data)
       });

    },[users])

    return (
        <div>
            <Messages messages = {messages} />
            <h2>Chat</h2>

            {users.map(user => {
            return (
            <div className = 'container'>
                <p>{user.id}. {user.username}</p> 
            </div>
            )
        })}
        </div>
    )
}
