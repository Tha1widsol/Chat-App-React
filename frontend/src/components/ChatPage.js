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
    const [popupErrors,setPopupErrors] = useState([])
    const [selectedUsers,setSelectedUsers] = useState([])
    
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

    function handleRemoveRoom(id,name){
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
                
                if(!name) setSuccess('Friend is removed') 
            
                else setSuccess('Room is removed')
            }

            else{
                setErrors(['Something went wrong']) 
            }
           
        })
    }

    function addUser(e){
        const selected = {user: e.target.name, checked: e.target.checked}

        if (selected.checked)
          setSelectedUsers(prevState => {
              return [...prevState, selected.user]
          }) 

        else {
            const newSelectedUsers = [...selectedUsers]
            let index = newSelectedUsers.findIndex(user => user.username === selected.user)
            newSelectedUsers.splice(index,1)
            setSelectedUsers(newSelectedUsers)
        }

    }

   const validateForm = (roomName) => {
        let errors = []
        let isValid = true
        
        if (roomName === ""){
            errors.push('Please enter a room name')
            isValid = false
        }

        if(rooms.filter(room => room.name === roomName).length > 0){
            errors.push('Room name already exists')
            isValid = false
        }
        
        if (selectedUsers == "") {
            errors.push('Please select at least 1 user')
            isValid = false
        }
        
        if (!isValid){
            setPopupErrors(errors)
            return 
        }

        return isValid
    }
    
    function handleCreateRoom(e){
        const roomName = roomNameRef.current.value

        if (!validateForm(roomName)){
            e.preventDefault()
            return 
        }

        const requestOptions = {
            method:'POST',
            headers:{'Content-Type':'application/json', Authorization:`Token ${localStorage.getItem('token')}`},
                
            body:JSON.stringify({
                name : roomName,
                members : logged_in_user.username + "," + selectedUsers.toString(),
                host : logged_in_user.username
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
        <div id = "rooms-container">
            <Errors errors = {errors} />
            <Success success = {success}/>

            <button id="add_room" onClick = {() => setPopup(true)}>Add room </button>
            <h2>Chat</h2>

            {popup ? <div className = "popup"> 
                            <Errors errors = {popupErrors} />
                            <div className = "close" onClick = {() => setPopup(false)}>&times;</div>
                            <h1><u>Create room</u></h1>
                            <input type='text' ref = {roomNameRef} placeholder='Room name...'/>
                            <h2>Add friends</h2>

                            <div id ="box"> 
                                {users.map((user,index) => {
                                    return (
                                        <div id="check-box-friends">
                                            <p>{index + 1}. {user.username}</p>
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
         
            {rooms.map((room,index) => {
            return (
            <div>
                <div className = 'container'>
                    <p style={{cursor:'pointer'}} onClick={() => history.push('chat/' + room.id)}>{room.name ? index + 1 + ". " + room.name + " - " + "(" + room.members + ")" : index + 1 + ". " + room.members.split(",").filter(name => name != logged_in_user.username)}</p>{room.host === logged_in_user.username || !room.name ? <span><button onClick = {() => handleRemoveRoom(room.id,room.name)} >Remove</button></span> : null}
                </div>
               
            </div>
          
            )
        })}
        </div>
    )
}
