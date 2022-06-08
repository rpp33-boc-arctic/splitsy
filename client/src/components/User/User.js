import React from 'react';
import axios from 'axios';
import History from './history.js';
import Friend from './Friend.js';
// import userData from './sampleData/exampleUser.js';
// import sessionData from './sampleData/exampleSession.js';
import Grid from '@mui/material/Grid';
import { List, Typography } from '@mui/material';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login_token: '',
      user_id: 0,
      username: '',
      photo_url: '',
      histories: [],
      friends: [],
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
    this.history = this.history.bind(this);
    this.friends = this.friends.bind(this);
  }

  initialize() {
    var login_tokenFromCookie = '';  //get session_id fro cookie from browswer
    var user_idFromCookie = 10;      //get from cookie broswer
    var usernameFromCookie = '';    //get from cookie broswer

    this.setState({
      login_token: login_tokenFromCookie,
      user_id: user_idFromCookie,
      username: usernameFromCookie
    }, () => {
      axios.get(`/user/profile${this.state.user_id}`)
        .then((success) => {
          console.log('axios GET /user/profile success: ', success.data)
          this.setState({
            user_id: success.data[0].user_id,
            username: success.data[0].username,
            photo_url: success.data[0].photo_url
          }, () => {
            this.history();
          })
        })
        .catch((error) => {
          console.log('axios GET /user/profile error: ', error);
        })
    })
  }

  history() {
    axios.get(`/user/history${this.state.user_id}`)
      .then((success) => {
        console.log('axios GET /user/history success: ', success.data)
        this.setState({
          histories: success.data
        })
      })
      .catch((error) => {
        console.log('axios GET /user/history error: ', error);
      })
  }

  friends() {
    axios.get(`/user/friends`)
      .then((success) => {
        console.log('axios GET /user/friends success: ', success.data)
        this.setState({
          friends: success.data
        })
      })
      .catch((error) => {
        console.log('axios GET /user/friends error: ', error);
      })
  }

  componentDidMount() {
    this.initialize();
    this.friends();
  }

  render() {
    var histories = this.state.histories.map((history, i) => {
      return <History history={history} key={i} />
    })
    var friends = this.state.friends.map((friend, i) => {
      return <Friend friend={friend} key={i} />
    })

    return (
      <div>
        <br></br>
        <Grid container spacing={1} id="user-page">
          <Grid item xs={3}>
            <img src={this.state.photo_url} alt="userPhoto" width="150"></img>
            <Typography>Dennis Wang</Typography>
            <Typography>@{this.state.username}</Typography> <br></br><br></br>
            <Typography>"Got paid today, time for some extra guac on my Chipotle!"</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography align='center' variant='h6'>Order History</Typography>
            <List style={this.state.scrollerOrderHistory} >
              {histories}
              {/* <History /> */}
            </List>
          </Grid>
          <Grid item xs={3}>
            <Typography align='center' variant='h6'>Friends List</Typography>
            <List style={this.state.scrollerFriendsList} >
              {friends}
              {/* <Friends /> */}
            </List>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default User;