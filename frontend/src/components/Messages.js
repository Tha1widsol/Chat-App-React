import React from 'react'

export default function Messages({messages}) {

    return (
        messages.map(message =>  {
            return (
                <div className = "error"> 
                  <p>  <li>{message} </li></p>
                </div>
                )
    
        })

    )
   
}
