import React,{useEffect,useState,useRef} from 'react'
import io from 'socket.io-client'
import { useHistory } from "react-router-dom";

export default function ChatRoom(props) {
    const username = props.match.params.username

    const [state,setStaet] = useState({message:'',name:''})
    const [chat,setChat] = useState([])

  
   const socketRef = useRef()

	useEffect(
		() => {
			socketRef.current = io.connect("http://localhost:4000")
			socketRef.current.on("message", ({ name, message }) => {
				setChat([ ...chat, { name, message } ])
			})
			return () => socketRef.current.disconnect()
		},
		[ chat ]
	)

    const onTextChange = (e) => {
        setStaet({...state,[e.target.name]:e.target.value})
    }


  

    const MessageRef = useRef()
    const NameRef = useRef()

    let history = useHistory()

    const renderChat = () => {
		return chat.map(({ name, message }, index) => (
			<div key={index}>
				<h3>
					{name}: <span>{message}</span>
				</h3>
			</div>
		))
	}




    const handleMessageSubmit = (e) => {
        e.preventDefault()
        const { name, message } = state
		socketRef.current.emit("message", { name, message })
		e.preventDefault()
		setStaet({ message: "", name })

    };



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
            <form onSubmit = {handleMessageSubmit}>
            <input type='text'  onChange={e => onTextChange(e)}  placeholder='Name...'/>
            <input type='text' onChange={e => onTextChange(e)}  placeholder='Message...'/>
            
            <button>Submit</button>
            </form>
            <h1>Chat Log</h1>
          {renderChat()}
        </div>
    )
}
