import React,{useState} from 'react'
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom"
import { TextField,Button,Grid,Typography } from '@material-ui/core';

export default function RoomJoinPage(props){

    const [rooms,setRooms] = useState({
        roomCode: "",
        error:""
    })

    function handleTextFieldChange(e){
        setRooms(prevState => {
            return {...prevState, roomCode: e.target.value}
        })
    }

    function roomButtonPressed(){
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body : JSON.stringify({
                code: rooms.roomCode
            })
        };

        fetch('/api/join-room',requestOptions).then((response) => {
            if (response.ok) {
                props.history.push("/room/" + rooms.roomCode)
            }

            else{
                setRooms(prevState => {
                    return {...prevState,error:"Room not found"}
                })
            }
        })
        
        .catch((error) => {
            console.log(error);
        })
    }
    
    return(
        <Grid container spacing={1} align = "center">
            <Grid item xs={12}>
                <Typography variant="h4" component = "h4">
                    Join a Room
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <TextField
                error = {rooms.error}
                label = "Code"
                placeholder="Enter a Room Code"
                value = {rooms.roomCode}
                helperText = {rooms.error}
                variant = "outlined"
                onChange = {handleTextFieldChange}
                />
            </Grid>


            <Grid item xs={12}>
                <Button variant = "contained" color="primary" onClick={roomButtonPressed}  component = {Link}>Enter Room</Button>
            </Grid>

            <Grid item xs={12}>
                <Button variant = "contained" color="secondary" to="/" component = {Link}>Back</Button>
            </Grid>

        </Grid>
    );
}

