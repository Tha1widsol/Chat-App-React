import React,{useEffect,useState,useRef} from 'react'
import io from 'socket.io-client';
import { useHistory,useParams } from "react-router-dom";
import ReactScrollableFeed from 'react-scrollable-feed';

const socket = io('http://localhost:3000', { transports : ['websocket'] })

export default function ChatRoom({logged_in_user}) {
    let history = useHistory()
    
    const {roomID} = useParams()

    const [messages,setMessages] = useState([])
    const [TypingMessage,setTypingMessage] = useState('')
    const [Seen,setSeen] = useState(false)
    const [members,setMembers] = useState([])
    const [room,setRoom] = useState({})
    const [roomName,setRoomName] = useState('')

  
    const MessageRef = useRef()

    socket.emit('new-user',roomID)

    const requestOptions = {
        headers: {'Content-Type': 'application/json', Authorization:`Token ${localStorage.getItem('token')}`}
    }

    useEffect(() => {
        fetch('/api/room/' + roomID,requestOptions).then((response) => 
        response.json()
    
        ).then((data) => {
            setRoom(data)
            setMembers(data.members.split(","))
            
            if (members.length == 2){
                const index = members.indexOf(logged_in_user.username)
                members.splice(index,1)
            }

            setRoomName(members)

        })

    })

    useEffect (() => {
        socket.on('chat-message',data => {
                console.log(data)
                setMessages(prevState => {
                    return [...prevState, {message: data.message, sender: data.sender, timestamp: data.timestamp}]
                })

        })

        const requestOptions = {
            headers: {'Content-Type': 'application/json', Authorization:`Token ${localStorage.getItem('token')}`}
        }

        fetch('/api/get_chat/' + roomID,requestOptions)
        .then(response =>{  
          return response.json()
        })


       .then(data => {
        const savedMessages = [...data]
        savedMessages.filter(obj => obj.sender === roomID ? obj.sender : obj.sender = "You")
        setMessages(savedMessages)
        });

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

        setSeen(false)

        setMessages(prevState => {
            return [...prevState, {message: message,sender: "You"}]
        })
  
        socket.emit('send-chat-message',message,logged_in_user.username,roomID)
        MessageRef.current.value = null

    }

    function handleTyping(){
        socket.emit('typing',roomID,logged_in_user.username)
    }

    return (
        <div>
            <h2>Chat room</h2>
            <p>{roomName}</p>
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
