import React,{useEffect,useState,useRef} from 'react'
import io from 'socket.io-client';
import { useHistory,useParams } from "react-router-dom";

const socket = io('http://localhost:3000', { transports : ['websocket'] })

export default function ChatRoom({logged_in_user}) {
    let history = useHistory()
    
    const {username} = useParams()

    const [messages,setMessages] = useState([])
    const [TypingMessage,setTypingMessage] = useState('')

    const MessageRef = useRef()

    socket.emit('new-user',logged_in_user.username)

    socket.on('user-connected',(name,socket) => {
        if(name == username){
            console.log(name + ' joined ' + 'id ' + socket)
        }

        else{
            console.log("not connected")
        }
       
    })

    socket.on('user-disconnected',name => {
        console.log(name + ' disconnected')
    })


    useEffect (() => {
        socket.on('chat-message',data => {
            if (data.name !== username) return

                setMessages(prevState => {
                    return [...prevState, `${data.name}: ${data.message} `]
                })
        })

        socket.on('typing',name => {
            if(name !== username) return 

                setTypingMessage(`${name} is typing...`)
                setTimeout(function(){ 
                    setTypingMessage('')
                }, 2000);

            })

    },[])
    
    function sendMessage(e){
        e.preventDefault()
        const message = MessageRef.current.value

        setMessages(prevState => {
            return [...prevState, `You: ${message}`]
        })
        socket.emit('send-chat-message',message,logged_in_user.username,username)
        MessageRef.current.value = null

    }

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

    function handleTyping(){
        socket.emit('user-typing',username,logged_in_user.username)
    }

    return (
        <div>
            <h2>Chat room</h2>
            <p>{username}</p>
    
            <h1>Chat Log</h1>
            <div id="chat-box">
                {messages.map((message,index) => {
                    return (
                    <div key = {index}>
                        <p>{message}</p>
                    </div>
                    )
                
                })}

            </div>

    
            
        <form onSubmit={sendMessage}>
            <input type='text' ref = {MessageRef} onKeyDown= {handleTyping}  placeholder='Message...'/>
            <button>Send</button>
        </form>

        <p>{TypingMessage}</p>

        </div>
    )
}
