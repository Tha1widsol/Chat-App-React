import React,{useState,useRef} from 'react'
import Errors from './Errors';
import Success from './Success';

export default function SearchPage({logged_in_user}) {
    document.title = 'Search'

    const SearchRef = useRef()

    const [errors,setErrors] = useState([])
    const [success,setSuccess] = useState('')
    const [users,setUsers] = useState([])


    const searchedUsers = () => {
        return users.filter(user => user.username !== logged_in_user.username)
    }

    function HandleAddFriend(id){
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', Authorization:`Token ${localStorage.getItem('token')}`},
        };

        fetch('api/user/'+id, requestOptions)
        .then((response)=> {
            if(response.ok){
                setSuccess('Friend request sent') 
            }

            else{
                setErrors(['Friend request already sent']) 
            }
           
        })
  
    }

    function HandleSubmitSearch(e){
        e.preventDefault()
        const SearchVal = SearchRef.current.value

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body : JSON.stringify({
                search_string: SearchVal
            })
        };

        fetch('/api/search',requestOptions)
        .then((response) => response.json())       
        .then(data => {
            if (data.length > 0){
                setUsers(data)
                setErrors([])
            }

            else setErrors(['No users found'+ ' for' + " '" + SearchVal + " '"])
                
        })
    }
    return (
        <div>
            <Errors errors = {errors}/>
            <Success success = {success}/>

            <h2>Search</h2>
            <form action="#" method="post">
                    <input type="search" ref={SearchRef} placeholder="Search..." id="search" autofocus = "autofocus" name="search_string" aria-label="Search" />   
                    <button onClick={HandleSubmitSearch}>Submit</button>
            </form>  

        {searchedUsers().map(user => {
          return (
              <div className = 'container'>
                <p> {user.id}. {user.username}</p> <span><button onClick = {() => HandleAddFriend(user.id)}>Add friend</button></span>
              </div>
          )
      })}
           
       </div>
    )
}
