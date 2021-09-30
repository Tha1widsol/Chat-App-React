import React from 'react'

export default function Messages({messages}) {

    let findDuplicates = messages => messages.filter((message, index) => messages.indexOf(message) != index);

    if (findDuplicates && messages.length > 1) messages.pop()
    
    return (
        messages.map(message =>  {
            return (
                <div className = {message.type}> 
                    <p>{message.text}</p>
                </div>
                )
    
        })

    )
   
}
