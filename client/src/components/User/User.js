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
      user_id: 0,
      firstname: '',
      lastname: '',
      photo_url: '',
      histories: [],
      friends: [],
      noOrderMessage: 'No order found! Create one!',
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
    this.friendClick = this.friendClick.bind(this);
  }

  initialize() {
    this.setState({
      user_id: this.props.cookieData.userId || 4
    }, () => {
      axios.get(`/user/profile${this.state.user_id}`)
        .then((success) => {
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
        this.setState({
          friends: success.data
        })
      })
      .catch((error) => {
        console.log('axios GET /user/friends error: ', error);
      })
  }

  friendClick(friend_id) {
    console.log('FRIEND CLICKED! ID', friend_id);
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
      return <Friend friend={friend} key={i} friendClick={this.friendClick} />
    })

    return (
      <div>
        <br></br>
        <Grid container spacing={1} id="user-page">
          <Grid item xs={3}>
            <img src={this.state.photo_url} alt="userPhoto" width="150"></img>
            <Typography>{this.state.firstname} {this.state.lastname}</Typography>
            <Typography>@{this.state.username}</Typography> <br></br>
            <Typography>"Got paid today, time for some extra guac on my Chipotle!"</Typography> <br></br><br></br>
            <Typography>About</Typography><br></br>
            <Typography>Documents</Typography><br></br>
            <Typography>Settings</Typography><br></br>
            <Typography>Help</Typography><br></br>
            <Typography>Terms and Conditions</Typography><br></br>
            <Typography>Contact Us</Typography><br></br>
          </Grid>
          <Grid item xs={6}>
            <Typography align='center' variant='h6'>Orders</Typography>
            <List style={this.state.scrollerOrderHistory} >
              {this.state.histories.length === 0 ? <Typography align='center'>{this.state.noOrderMessage}</Typography> : histories}
            </List>
          </Grid>
          <Grid item xs={3}>
            <Typography align='center' variant='h6'>Friends</Typography>
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