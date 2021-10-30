import React,{useEffect,useState} from 'react'
import Messages from './Messages'
import { useHistory } from "react-router-dom";

export default function ChatRoom(props) {
    const username = props.match.params.username
    const [messages,setMessages] = useState({arr:[],type:''})

    let history = useHistory()

    useEffect (() => {
        const requestOptions = {
            headers: {'Content-Type': 'application/json', Authorization:`Token ${localStorage.getItem('token')}`}
        }

        fetch('/api/get_chat/' + username,requestOptions)
        
        
        .then((response) => {
           if (!response.ok){
            history.push('/')
           }
       });

    })

    return (
        <div>
            <Messages messages = {messages}/>
            <h2>Chat room</h2>
            <p>{username}</p>
        </div>
    )
}
