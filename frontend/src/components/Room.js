import React, { useState } from 'react';

export default function Room(props){
    const [state,setState] = useState({
        votesToSkip: 2,
        guestCanPause: false,
        isHost: false,
    });

    const roomCode = props.match.params.roomCode

    getRoomDetails()

    function getRoomDetails(){
        fetch('/api/get-room?code='+ roomCode).then((response) => 
        response.json()

       ).then((data) => {
        setState({
           votesToSkip: data.votes_to_skip,
           guestCanPause: data.guest_can_pause,
           isHost: data.is_host,
        });

       });
    }
    return (
        <>
          <h3>{roomCode}</h3>
           <p>Votes: {state.votesToSkip}</p>
           <p>Guest Can Pause:{state.guestCanPause.toString()}</p>
           <p>Host:{state.isHost.toString()}</p>
        </>
    );
}

