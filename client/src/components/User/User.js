import React from 'react';
import Grid from '@mui/material/Grid';
import { List } from '@mui/material';
import userData from './sampleData/exampleUser.js';
import sessionData from './sampleData/exampleSession.js';
import Button from '@mui/material/Button';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import QrCode from '@mui/icons-material/QrCode';
import Settings from '@mui/icons-material/Settings';
import Item from './Item.js';
import Friend from './Friend.js';

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
      <Grid container spacing={1} id="payment-page">
        <Grid item xs={1}>
          <img src={userData.results[1].photo_url} alt="userPhoto" width="100"></img>
        </Grid>
        <Grid item xs={11}>
          @exampleUsername
        </Grid>
        <Grid item xs={2}>
          "Got paid today, time for some extra guac on my Chipotle!" <br></br> <br></br>
        </Grid>
        <Grid item xs={6}>
          Order History
          <List >
            {items}
          </List>
        </Grid>
        <Grid item xs={4}>
          Friends List
          <List >
            {friends}
          </List>
        </Grid>
        <Grid item xs={12} container justifyContent="flex-start">
          <Button variant="contained" endIcon={<Settings />}>
            Setting
          </Button>
        </Grid>
        <Grid item xs={12} container justifyContent="flex-start">
          <Button variant="contained" endIcon={<QrCode />}>
            QR Code
          </Button>
        </Grid>
        <Grid item xs={12} container justifyContent="flex-start">
          <Button variant="contained" endIcon={<ArrowCircleRightIcon />}>
            Log Out
          </Button>
        </Grid>
      </Grid>
    )
  }
}

export default User;