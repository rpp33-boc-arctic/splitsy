import React from 'react';
import Grid from '@mui/material/Grid';
import { List, Typography } from '@mui/material';
import userData from './sampleData/exampleUser.js';
import sessionData from './sampleData/exampleSession.js';
import Button from '@mui/material/Button';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import QrCode from '@mui/icons-material/QrCode';
import SearchIcon from '@mui/icons-material/Search'
import Settings from '@mui/icons-material/Settings';
import History from './history.js';
import Friend from './Friend.js';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usenrame: '',
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
    this.username = this.username.bind(this);
    this.history = this.history.bind(this);
    this.friends = this.friends.bind(this);
    this.logout = this.logout.bind(this);
  }

  username() {

  }

  history() {

  }

  friends() {

  }

  logout() {

  }

  componentDidMount() {
    this.username();
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
            <img src={userData.results[1].photo_url} alt="userPhoto" width="100"></img>
            <Typography>@username</Typography><br></br> <br></br>
            <Typography>"Got paid today, time for some extra guac on my Chipotle!"</Typography><br></br><br></br><br></br>
            <Button variant="contained" endIcon={<SearchIcon />}>
              Search
            </Button> <br></br><br></br>
            <Button variant="contained" endIcon={<QrCode />}>
              QR Code
            </Button> <br></br><br></br>
            <Button variant="contained" endIcon={<Settings />}>
              Setting
            </Button> <br></br><br></br>
            <Button variant="contained" endIcon={<ArrowCircleRightIcon />} onClick={this.logout}>
              Log Out
            </Button>
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