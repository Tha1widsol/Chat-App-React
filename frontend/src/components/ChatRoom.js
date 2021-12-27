import React,{useEffect,useState,useRef} from 'react'
import io from 'socket.io-client';
import { useHistory,useParams } from "react-router-dom";
import ReactScrollableFeed from 'react-scrollable-feed';
import Errors from './Errors';

const socket = io('http://localhost:3000', { transports : ['websocket'] })

export default function ChatRoom({logged_in_user}) {
    const {roomID} = useParams()
    
    let history = useHistory();

    const [messages,setMessages] = useState([])
    const [TypingMessage,setTypingMessage] = useState('')
    const [Seen,setSeen] = useState(false)
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
        messages.filter((obj,index) => {
            if (index === messages.length - 1 && obj.sender != "You"){
                setSeen(false)
            }
        })
    })
  
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
            history.push('/')
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
        const message = MessageRef.current.value

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
 
        socket.on('seen',() => {
            setTimeout(function(){ 
                setSeen(true)
            }, 800);
            
            
        })

        setSeen(false)
    
       

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
                            <p>{obj.sender  + ": " + obj.message}</p>
                        </div>
                        )
                    
                    })}
                     {Seen ? <p id="seen">Seen</p> : null}
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
