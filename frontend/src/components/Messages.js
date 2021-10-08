import React from 'react'

export default function Messages({messages}) {

    return (
        messages.arr.map(message =>  {
            return (
                <div className = {messages.type}> 
                  <p>  <li>{message} </li></p>
                </div>
                )
    
        })

    )
   
}
