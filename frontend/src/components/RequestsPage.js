import React,{useState,useEffect} from 'react'
import Messages from './Messages'
export default function RequestsPage() {
    const [users,setUsers] = useState([])
    const [messages,setMessages] = useState({arr:[],type:''})

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

        fetch('/api/added_back',requestOptions)
        .then(response => {
            if(!response.ok){
                throw Error('User is already added')
            }
            return response.json()
        })

        .then(()=> {
            setMessages({arr:['Friend added'],type:'success'}) 
            const newUsers = [...users]
            let index = newUsers.findIndex(user => user.id == id)
            newUsers.splice(index,1)
            setUsers(newUsers)
        })

        .catch(error => {
            setMessages({arr:[error.message],type:'error'})
        })
  
    }

    return (
        <div>
            <Messages messages = {messages} />
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
