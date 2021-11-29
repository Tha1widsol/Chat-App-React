import React from 'react'

export default function Errors({errors}) {
    return (
        errors.map(error => {
            return (
                <div className = 'error'> 
                  <p>  <li>{error}</li></p>
                </div>
                )
    
        })

    )
   
}
