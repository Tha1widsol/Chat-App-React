import React,{useState,useEffect} from 'react'
import Errors from './Errors'
import Success from './Success'
import {Helmet} from 'react-helmet'

export default function RequestsPage() {

    const [users,setUsers] = useState([])
    const [errors,setErrors] = useState([])
    const [success,setSuccess] = useState('')

    useEffect(() => {
        const requestOptions = {
            headers: {'Content-Type': 'application/json', Authorization:`Token ${localStorage.getItem('token')}`}
        }

        fetch('/api/requests',requestOptions).then((response) => 
        response.json()

       ).then((data) => {
            setUsers(data)
       });

    },[users])

    function HandleAddFriend(id){
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', Authorization:`Token ${localStorage.getItem('token')}`},
        };

        fetch('/api/accept_friend/' + id ,requestOptions)
        .then(response => {
            if(!response.ok){
                console.log(response)
                throw Error('User is already added')
            }
          
        })

        .then(()=> {
            setSuccess('Friend added') 
            const newUsers = [...users]
            let index = newUsers.findIndex(user => user.id == id)
            newUsers.splice(index,1)
            setUsers(newUsers)
        })

        .catch(error => {
            setErrors([error.message])
        })
  
    }

    return (
        <div>
            <Helmet>
                <title>Requests</title>
            </Helmet>

            <Errors errors = {errors}/>
            <Success success = {success}/>

            <h2>Requests</h2>

            {users.map(user => {
            return (
            <div className = 'container'>
                <p>{user.id}. {user.username} - (Requested to be friends) <span><button onClick = {() => HandleAddFriend(user.id)}>Add friend</button></span></p> 
            </div>
            )
        })}
         
        </div>
    )
}
