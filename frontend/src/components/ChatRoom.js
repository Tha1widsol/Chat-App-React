import React,{useEffect,useState,useRef} from 'react'
import io from 'socket.io-client';
import { useHistory } from "react-router-dom";

export default function ChatRoom(props) {
    const username = props.match.params.username

   
   const [yourID,setYourID] = useState();
   const [messages,setMessages] = useState([])
   const [message,setMessage] = useState("")

   const socketRef = useRef()

	useEffect (() => {
		socketRef.current = io.connect("/");
        socketRef.current.on("your id", id => {
            setYourID(id)
        })
        socketRef.current.on("message",(message) => {
            recievedMessage(message)
        })
    })

    function recievedMessage(message){
        setMessages(oldMsgs => [...oldMsgs,message])
    }

    function sendMessage(e){
        e.preventDefault()
        const messageObject = {
            body:message,
            id: yourID,
        }
        setMessage("")
        socketRef.current.emit("send message",messageObject)
    }

   function handleChange(e){
       setMessage(e.target.value)
   }


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
        
            <h2>Chat room</h2>
            <p>{username}</p>
    
            <h1>Chat Log</h1>

         {messages.map((message,index) => {
             if(message.id === yourID){
                    return (
                        <div key={index}>
                            <p>{message.body}</p>
                        </div>
                    )
             }

            return (
                <div key= {index}>
                    <p>sender: {message.body}</p>
                </div>
            )

         })}

        <form onSubmit={sendMessage}>
            <input type='text' value={message} onChange={handleChange}  placeholder='Message...'/>
            <button>Send</button>
        </form>
        


        </div>
    )
}
