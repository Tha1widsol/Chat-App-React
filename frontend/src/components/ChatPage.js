import React,{useState,useEffect,useRef} from 'react'
import { useHistory } from "react-router-dom";
import Errors from './Errors'

export default function ChatPage({logged_in_user}) {
    const [users,setUsers] = useState([])
    const [rooms,setRooms] = useState([])
    const [errors,setErrors] = useState([])
    const [popup,setPopup] = useState(false)

    const MessageRef = useRef()

    let history = useHistory()

    useEffect(() => {
        const requestOptions = {
            headers: {'Content-Type': 'application/json', Authorization:`Token ${localStorage.getItem('token')}`}
        }

        fetch('/api/get_friends',requestOptions).then((response) => 
        response.json()

       ).then((data) => {
            setUsers(data)
       });

    },[users])

    useEffect(() => {
        const requestOptions = {
            headers: {'Content-Type': 'application/json', Authorization:`Token ${localStorage.getItem('token')}`}
        }

        fetch('/api/get_rooms',requestOptions).then((response) => 
        response.json()

       ).then((data) => {
            setRooms(data)
       });
    },[rooms])

    function handleRemoveFriend(id){
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', Authorization:`Token ${localStorage.getItem('token')}`},
        };

        fetch('api/remove_friend/'+ id, requestOptions)
        .then((response)=> {
            if(response.ok){
                setErrors(['Friend is removed']) 
            }

            else{
                setErrors(['Something went wrong']) 
            }
           
        })
    }
    
    return (
        <div>
            <Errors errors = {errors} />
            <button id="add_room" onClick = {() => setPopup(true)}>Add room </button>
            <h2>Chat</h2>

            {popup ? <div className = "popup"> 
                            <div className = "close" onClick = {() => setPopup(false)}>&times;</div>
                            <h1><u>Create Room</u></h1>
                            <input type='text' ref = {MessageRef} placeholder='Room name...'/>
                            <h2>Add friends</h2>

                            <div id ="box"> 
                                {users.map(user => {
                                    return (
                                        <div id="check-box-friends">
                                            <p>{user.id}. {user.username}</p>
                                            <input type="checkbox" id="check"/>
                                        </div>
                                    )
                                })}
                            </div>
                           
                            <button type="submit">Submit</button>
                    </div>
                : null}
         
            {rooms.map(room => {
            return (
            <div>
                <div className = 'container'>
                    <p style={{cursor:'pointer'}} onClick={() => history.push('chat/' + room.id)}>{room.id}. {room.members.split(",").length > 2 ? room.name : room.members.split(",").filter(name => name != logged_in_user.username)}</p><span><button onClick = {() => handleRemoveFriend(user.id)}>Remove friend</button></span>
                   
                </div>
               
            </div>
          
            )
        })}
        </div>
    )
}
