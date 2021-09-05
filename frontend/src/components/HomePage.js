import React,{useState,useEffect} from 'react'
import {Grid,Button,ButtonGroup,Typography} from "@material-ui/core"
import {BrowserRouter as Router,Switch,Route,Link,Redirect} from "react-router-dom"
import CreateRoomPage from './CreateRoomPage';
import RoomJoinPage from './RoomJoinPage';
import Room from './Room';

export default function HomePage(){

    const [rooms,setRooms] = useState({
        roomCode:null,
    })

    
   useEffect(() => {
       async function fetchSessionAPI(){
        fetch('/api/user-in-room')
        .then((response) => response.json())
        .then((data) => {
            setRooms(prevState =>{
                return {...prevState,roomCode: data.code}
            })
        });
       }

       fetchSessionAPI()
      
    },[])

    function renderHomePage(){
             
        return (
            <Grid container spacing ={3}>
                <Grid item xs={12} align="center">
                    <Typography variant="h3" component = "h3">
                        House Party
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <ButtonGroup disableElevation variant="contained" color="primary">
                        <Button color = "primary" to = '/join' component ={Link}>
                            Join a Room
              </Button>
                        <Button color = "secondary" to = '/create' component ={Link}>
                            Create a Room
                        </Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        );
    }
    return(
    <Router>
        <Switch>
            <Route exact path="/" render = {() => {
                return rooms.roomCode ? (<Redirect to={'/room/' + rooms.roomCode}/>) : renderHomePage() // If theres a room code then redirect to  '/room/' + rooms.roomCode. Else just call renderHomePage
            }}/>
        
          <Route exact path="/join" render = {() => {
                return rooms.roomCode ? (<Redirect to={'/room/' + rooms.roomCode}/>) : RoomJoinPage // If theres a room code then redirect to  '/room/' + rooms.roomCode. Else just call renderHomePage
            }}/>
            

            <Route path='/create' component={CreateRoomPage}></Route>
            <Route path='/room/:roomCode' component={Room}></Route>
        </Switch>
    </Router>);
}