import React,{useState,useEffect} from 'react'
import Errors from './Errors'
import Success from './Success'

export default function SentPage() {
    const [users,setUsers] = useState([])
    const [errors,setErrors] = useState([])
    const [success,setSuccess] = useState('')

    useEffect(() => {
        const requestOptions = {
            headers: {'Content-Type': 'application/json', Authorization:`Token ${localStorage.getItem('token')}`}
        }

        fetch('/api/sent',requestOptions).then((response) => 
        response.json()

       ).then((data) => {
            setUsers(data)
       });

    },[])

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

              setSuccess("Friend request cancelled")
            }

            else{
                console.log(response)
            }
          
        })
    }

    return (
        <div>
          <Errors errors = {errors}/>
          <Success success = {success}/>
          
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
