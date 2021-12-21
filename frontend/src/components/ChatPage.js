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
    const selectedUsers = [logged_in_user.username]

    const roomNameRef = useRef()

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

    function handleRemoveRoom(id){
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', Authorization:`Token ${localStorage.getItem('token')}`},
        };

        fetch('api/remove_room/'+ id, requestOptions)
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

    function addUser(e){
        const selected = {user: e.target.name, checked: e.target.checked}

        if (selected.checked)
          selectedUsers.push(selected.user) 

        else {
            const index = selectedUsers.indexOf(selected.user)
            selectedUsers.splice(index,1)
        }
    }
    
    function handleCreateRoom(){
        const roomName = roomNameRef.current.value

        const requestOptions = {
            method:'POST',
            headers:{'Content-Type':'application/json', Authorization:`Token ${localStorage.getItem('token')}`},
                
            body:JSON.stringify({
                name : roomName,
                members : selectedUsers.toString()
            })
        
        };
      
        fetch('/api/create_room',requestOptions)

        .then((response) => {
            if (response.ok) {
                history.push('/')
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
                            <input type='text' ref = {roomNameRef} placeholder='Room name...'/>
                            <h2>Add friends</h2>

                            <div id ="box"> 
                                {users.map(user => {
                                    return (
                                        <div id="check-box-friends">
                                            <p>{user.id}. {user.username}</p>
                                            <input type="checkbox" id="check"  name={user.username}  onChange={addUser}/>
                                        </div>
                                    )
                                })}
                            </div>

                            <form onSubmit={handleCreateRoom}>
                               <button type="submit">Submit</button>
                            </form>
                    </div>
                : null}
         
            {rooms.map(room => {
            return (
            <div>
                <div className = 'container'>
                    <p style={{cursor:'pointer'}} onClick={() => history.push('chat/' + room.id)}>{room.id}. {room.name ? room.name : room.members.split(",").filter(name => name != logged_in_user.username)}</p>{room.members.split(",")[0] == logged_in_user.username || room.members.split(",").length < 3 ? <span><button onClick = {() => handleRemoveRoom(room.id)} >Remove</button></span> : null}
                </div>
               
            </div>
          
            )
        })}
        </div>
    )
}
