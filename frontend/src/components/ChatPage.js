import React,{useState,useEffect} from 'react'
import { useHistory } from "react-router-dom";
import Errors from './Errors'

export default function ChatPage() {
    const [users,setUsers] = useState([])
    const [errors,setErrors] = useState([])

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
            <h2>Chat</h2>

            {users.map(user => {
            return (
            <div>
                <div className = 'container'>
                    <p style={{cursor:'pointer'}} onClick={() => history.push('chat/' + user.username)}>{user.id}. {user.username}</p><span><button onClick = {() => handleRemoveFriend(user.id)}>Remove friend</button></span>
                   
                </div>
               
            </div>
          
            )
        })}
        </div>
    )
}
