import React,{useEffect,useState,useRef} from 'react'
import io from 'socket.io-client';
import { useNavigate,useParams } from "react-router-dom";
import ReactScrollableFeed from 'react-scrollable-feed';
import Errors from './Errors';

const socket = io('http://localhost:4000', { transports : ['websocket'] })

export default function ChatRoom({logged_in_user}) {
    const {roomID} = useParams()
    
    let navigate = useNavigate();

    const [messages,setMessages] = useState([])
    const [TypingMessage,setTypingMessage] = useState('')
    const [room,setRoom] = useState({})
    const [errors,setErrors] = useState([])
    const [roomName,setRoomName] = useState('')
    
    const MessageRef = useRef()

    socket.emit('new-user',roomID)

    const requestOptions = {
        headers: {'Content-Type': 'application/json', Authorization:`Token ${localStorage.getItem('token')}`}
    }

    useEffect(() => {
      
        fetch('/api/get_chat/' + roomID,requestOptions)
        .then((response) =>   
          response.json()
        )

       .then(data => {
        setMessages(data)
        })
      

    },[])
  
    useEffect (() => {
        fetch('/api/room/' + roomID,requestOptions).then(response => {
            if(!response.ok)
                throw Error()
            
            return response.json()
        })
        
        .then((data) => {
            setRoom(data)
            if (data.name)
                setRoomName(data.name)
            
            else {
                data.members.split(",").filter(name => {
                    if (name != logged_in_user.username)
                        setRoomName(name)
                })
            }

        })
        
        .catch(()=> {
            navigate('/')
        })


    },[roomName])

    
    useEffect(() => {
        socket.on('chat-message',data => {
            setMessages(prevState => {
                return [...prevState, {message: data.message, sender: data.sender, timestamp: data.timestamp}]
            })
    
        })
    
        socket.on('user-typing',name => {
            setTypingMessage(`${name} is typing...`)
            setTimeout(function(){ 
                setTypingMessage('')
            }, 2000);
        
        })

    
    },[])

   
    function sendMessage(e){
        e.preventDefault()
        let errors = []
        const message = MessageRef.current.value

        if (message === "") {
            errors.push('Please enter a valid message')
            setErrors(errors)
            return
        }

        else setErrors([])

        const requestOptions = {
            method:'POST',
            headers:{'Content-Type':'application/json', Authorization:`Token ${localStorage.getItem('token')}`},
                
            body:JSON.stringify({
                message : message,
                roomID : roomID
            })
        
        };
      
      
        fetch('/api/save_message',requestOptions)

        socket.emit('send-chat-message',message,logged_in_user.username,roomID)
    
        setMessages(prevState => {
            return [...prevState, {message: message,sender: "You"}]
        })
  
        MessageRef.current.value = null

    }

    function handleTyping(){
        socket.emit('typing',roomID,logged_in_user.username)
    }

    return (
        <div>
            <Errors errors = {errors} />
            <h2>Chat room</h2>
            <p>{roomName}</p>
            
          {room.host ?  
            <div>
                <h3>Host:</h3>
                <p>{room.host}</p>
            </div>
        : null}
             
            <h1>Chat Log</h1>
          
                <div id="box">
                    <ReactScrollableFeed>
                    {messages.map((obj,index) => {
                        return (
                        <div key = {index}>
                            <p className = {obj.sender === "You" ? "you-message-container" : "reciever-message-container"}>{obj.sender  + ": " + obj.message}</p>
                        </div>
                        )
                    
                    })}
                    </ReactScrollableFeed>
                 
                </div>
          
               

        <form onSubmit={sendMessage}>
            <input type='text' ref = {MessageRef} onKeyDown= {handleTyping}  placeholder='Message...'/>
            <button>Send</button>
        </form>

        <p>{TypingMessage}</p>

        </div>
    )
}
