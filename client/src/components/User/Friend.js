import React from 'react';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';

class Friend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <>
        <Grid container spacing={4}>
          <Grid item xs={3}>
            <br></br>
            <img src={this.props.friend.photo_url} alt="friendPhoto" width="50"></img>
          </Grid>
          <Grid item xs={8}>
            <br></br>
            <Typography>{this.props.friend.firstname || 'My '} {this.props.friend.lastname || 'Friend'}</Typography>
            <Typography>@{this.props.friend.username}</Typography><br></br>
          </Grid>
        </Grid>
        <Divider />
      </>
    )
  }
}

export default Friend;