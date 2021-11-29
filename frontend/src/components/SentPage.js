import React,{useState,useEffect} from 'react'
import Errors from './Errors'

export default function SentPage() {
    const [users,setUsers] = useState([])
    const [errors,setErrors] = useState([])

    useEffect(() => {
        const requestOptions = {
            headers: {'Content-Type': 'application/json', Authorization:`Token ${localStorage.getItem('token')}`}
        }

        fetch('/api/sent',requestOptions).then((response) => 
        response.json()

       ).then((data) => {
            setUsers(data)
       });

    },[users])

    function HandleUnsendFriendRequest(id){
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', Authorization:`Token ${localStorage.getItem('token')}`},
        };

        fetch('/api/remove_sent/' + id,requestOptions)

        .then((response) =>{
            if (response.ok){
               const newUsers = [...users]
               let index = newUsers.findIndex(user => user.id === id)
               newUsers.splice(index,1)
               setUsers(newUsers)

              setErrors(["Friend request cancelled"])
            }
          
        })
    }

    return (
        <div>
           <Errors errors = {errors} />
           <h2>Sent</h2>
          {users.map(user => {
            return (
            <div className = 'container'>
                <p>{user.id}. {user.username}</p> <span><button onClick = {() => HandleUnsendFriendRequest(user.id)}>Unsend request</button></span>
            </div>
            )
        })}
        
        </div>
    )
}
