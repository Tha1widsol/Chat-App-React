import React,{useState,useEffect} from 'react'

export default function SentPage() {
    const [users,setUsers] = useState([])

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
            body : JSON.stringify({
                friend: id
            })
        };

        fetch('/api/remove_request',requestOptions)
    }

    return (
        <div>
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
