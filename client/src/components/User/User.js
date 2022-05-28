import React from 'react';
import Grid from '@mui/material/Grid';
import { List } from '@mui/material';
import userData from './sampleData/exampleUser.js';
import sessionData from './sampleData/exampleSession.js';
import Button from '@mui/material/Button';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import QrCode from '@mui/icons-material/QrCode';
import Settings from '@mui/icons-material/Settings';
import Item from './item.js';
import Friend from './friend.js';
import NavBar from './navbar.js';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usenrame: ''
    }
  }

  render() {
    var items = sessionData.group_cart.map((item, i) => {
      return <Item item={item} key={i} />
    })
    var friends = userData.results.map((friend, i) => {
      return <Friend friend={friend} key={i} />
    })
    return (
      <div>
        <NavBar /> <br></br>
        <Grid container spacing={1} id="user-page">
          <Grid item xs={2}>
            <img src={userData.results[1].photo_url} alt="userPhoto" width="100"></img>
          </Grid>

          <Grid item xs={10} container justifyContent="flex-end">
            <Button variant="contained" endIcon={<QrCode />}>
              QR Code
            </Button>
            <Button variant="contained" endIcon={<Settings />}>
              Setting
            </Button>
            <Button variant="contained" endIcon={<ArrowCircleRightIcon />}>
              Log Out
            </Button>
          </Grid>
          <Grid item xs={2}>
            @userUsername<br></br> <br></br>
            "Got paid today, time for some extra guac on my Chipotle!"
          </Grid>
          <Grid item xs={7}>
            Order History
            <List >
              {items}
            </List>
          </Grid>
          <Grid item xs={3}>
            Friends List
            <List >
              {friends}
            </List>
          </Grid>

        </Grid>
      </div>
    )
  }
}

export default User;