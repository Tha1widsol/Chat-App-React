import React,{useState,useEffect,useRef} from 'react'
import { useHistory } from "react-router-dom";
import Errors from './Errors'
import Success from './Success';

export default function ChatPage({logged_in_user}) {
    const [users,setUsers] = useState([])
    const [rooms,setRooms] = useState([])
    const [errors,setErrors] = useState([])
    const [success,setSuccess] = useState('')
    const [popup,setPopup] = useState(false)

    const MessageRef = useRef()

    let history = useHistory()

    const requestOptions = {
        headers: {'Content-Type': 'application/json', Authorization:`Token ${localStorage.getItem('token')}`}
    }

    useEffect(() => {

        fetch('/api/get_friends',requestOptions).then((response) => 
        response.json()

       ).then((data) => {
            setUsers(data)
       });

    },[])

    useEffect(() => {

        fetch('/api/get_rooms',requestOptions).then((response) => 
        response.json()

       ).then((data) => {
            setRooms(data)
       });

    },[])

    function handleRemoveFriend(id){
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', Authorization:`Token ${localStorage.getItem('token')}`},
        };

        fetch('api/remove_friend/'+ id, requestOptions)
        .then((response)=> {
            if(response.ok){
                const newRooms = [...rooms]
                let index = newRooms.findIndex(room => room.id === id)
                newRooms.splice(index,1)
                setRooms(newRooms)
                
                setSuccess('Friend is removed') 
            }

            else{
                setErrors(['Something went wrong']) 
            }
           
        })
    }
    
    return (
        <div>
            <Errors errors = {errors} />
            <Success success = {success}/>

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
                    <p style={{cursor:'pointer'}} onClick={() => history.push('chat/' + room.id)}>{room.id}. {room.members.split(",").length > 2 ? room.name : room.members.split(",").filter(name => name != logged_in_user.username)}</p><span><button onClick = {() => handleRemoveFriend(room.id)}>Remove friend</button></span>
                   
                </div>
               
            </div>
          
            )
        })}
        </div>
    )
}
