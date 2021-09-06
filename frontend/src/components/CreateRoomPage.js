import React, { useState } from "react";

import {Button,Grid,Typography,TextField,FormHelperText,
  FormControl,Radio,RadioGroup, FormControlLabel } from "@material-ui/core";

import Link from "react-router-dom";

export default function CreateRoomPage(props) {
  let defaultVotes = 2;

     const [rooms,setRooms] = useState({
      guestCanPause: true,
      votesToSkip: defaultVotes,
    });


  function handleVotesChange(e) {
    setRooms(prevState => {
      return {...prevState,votesToSkip: parseInt(e.target.value)}

    });
  
  }

  function handleGuestCanPauseChange(e) {
    setRooms(prevState => {
      return {...prevState,guestCanPause: e.target.value === "true" ? true : false,}
    });
  }

  function handleRoomButtonPressed() {
    const requestOptions = {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        votes_to_skip: rooms.votesToSkip,
        guest_can_pause: rooms.guestCanPause
      }),
    };
    fetch('/api/create-room',requestOptions) // Puts frontend information into '/api/create-room'
    .then((response) => response.json())

    .then((data) => props.history.push('/room/' + data.code)); // Redirects to /room/+ room code/
   
  }



    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography component="h4" variant="h4">
            Create A Room
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl component="fieldset">
            <FormHelperText>
              <div align="center">Guest Control of Playback rooms</div>
            </FormHelperText>
            <RadioGroup
              row
              defaultValue="true"
              onChange={handleGuestCanPauseChange}
            >
              <FormControlLabel
                value="true"
                control={<Radio color="primary" />}
                label="Play/Pause"
                labelPlacement="bottom"
              />
              <FormControlLabel
                value="false"
                control={<Radio color="secondary" />}
                label="No Control"
                labelPlacement="bottom"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl>
            <TextField
              required={true}
              type="number"
              onChange={handleVotesChange}
              defaultValue={defaultVotes}
              inputProps={{
                min: 1,
                style: { textAlign: "center" },
              }}
            />
            <FormHelperText>
              <div align="center">Votes Required To Skip Song</div>
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            color="primary"
            variant="contained"
            onClick={handleRoomButtonPressed}
          >
            Create A Room
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button color="secondary" variant="contained" to="/" component={Link}>
            Back
          </Button>
        </Grid>
      </Grid>
    );
  }
