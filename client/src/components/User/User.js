import React from 'react';
import axios from 'axios';
import History from './History.js';
import Friend from './Friend.js';
import userData from './sampleData/exampleUser.js';
import sessionData from './sampleData/exampleSession.js';
import Grid from '@mui/material/Grid';
import { List, Typography } from '@mui/material';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      session_id: 0,
      user_id: '',
      username: '',
      scrollerOrderHistory: {
        overflowY: 'scroll',
        border: '1px solid white',
        width: '600px',
        float: 'center',
        height: '500px',
      },
      scrollerFriendsList: {
        overflowY: 'scroll',
        border: '1px solid white',
        width: '300px',
        float: 'center',
        height: '500px',
      }
    }
    this.initialize = this.initialize.bind(this);
  }

  initialize() {
    var username = '';    //get from cookie broswer
    var userId = 0;     //get from cookie broswer
    var session_id = 0;  //get session_id fro cookie from browswer

    this.setState({
      session_id: session_id,
      username: username,
      user_id: userId
    }, () => {
      axios.get('/user/profile')
        .then((user) => {
          console.log('axios GET /user/profile success: ', user)
          // this.setState({
          //   username: user.username
          // })
        })
        .catch((error) => {
          console.log('axios GET /user/profile error: ', error);
        })

    })
  }

  componentDidMount() {
    this.initialize();
  }

  render() {
    var histories = sessionData.group_cart.map((history, i) => {
      return <History history={history} key={i} />
    })
    var friends = userData.results.map((friend, i) => {
      return <Friend friend={friend} key={i} />
    })
    return (
      <div>
        <br></br>
        <Grid container spacing={1} id="user-page">
          <Grid item xs={3}>
            <img src={userData.results[1].photo_url} alt="userPhoto" width="150"></img>
            <Typography>FirstName LastName</Typography>
            <Typography>@userUsername</Typography> <br></br><br></br>
            <Typography>"Got paid today, time for some extra guac on my Chipotle!"</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography align='center' variant='h6'>Order History</Typography>
            <List style={this.state.scrollerOrderHistory} >
              {histories}
            </List>
          </Grid>
          <Grid item xs={3}>
            <Typography align='center' variant='h6'>Friends List</Typography>
            <List style={this.state.scrollerFriendsList} >
              {friends}
            </List>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default User;