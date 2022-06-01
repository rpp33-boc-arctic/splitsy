import React from 'react';
import axios from 'axios';

import Timer from './timer.js';
import UserList from './userList.js';
import ItemPaidBar from './itemPaidBar.js';
import UserPaidBar from './userPaidBar.js';
import Items from './items.js';
import Tip from './tip.js';
import Bill from './bill.js';
import RedirectButton from './redirectButton.js';
import Grid from '@mui/material/Grid';
import { group_cart } from './sampleData/session.js';
import session from './sampleData/session.js';

import Button from '@mui/material/Button';

class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_pick: [],      //array of order_item_id of current user
      username: "",       //from cookie (after session_cookie had verified)
      user_id:"",
      group_cart: {},
      session_id: 1,      //session id from cookie? or pass from other component
      others_pick: [],    //array of order_item_id of others
      not_yet_pick: []    //array of order_item_id of non chosen item
    }
  }

  //==========================     MAIN     ==========================
  componentDidMount () {
    this.updateItemsOnMainBoard();
  }

  handleAddToCart () {

  }

  handleRemoveFromCart () {

  }

  addAllNonPickedToCart () {

  }

  //==========================     HELPER     ==========================
  updateItemsOnMainBoard () {
    axios.get(`/session${this.state.session_id}/users`)
      .then((users) => {

        users = users.data[0].users
        // console.log('users', users)
        var all_item = Object.keys(this.state.group_cart);
        var others_item = [];
        var my_item = [];
        var all_chosen_item = [];
        var non_chosen_item = [];

        for (var userId in users) {
          if (userId !== this.state.user_id) {
            others_item =  new Set([...others_item, ...users[userId].user_cart])
          }

          if (userId ===  this.state.user_id) {
            my_item = [...my_item, users[userId].user_cart]
          }
        }

        all_chosen_item = [...my_item, ...others_item];
        non_chosen_item = new Set([...all_item, ...all_chosen_item]);


        this.setState({
          user_pick: my_item,
          others_pick: others_item,
          not_yet_pick: non_chosen_item
        }, () => {
          // console.log('state', this.state);
        })
      })
      .catch((err) => {
        console.log('error in handleItemPick', err)
      })
  }

  getPrice (order_item_id) {

  }
  //==========================     RENDER     ==========================
  render() {
    return (
      <Grid container spacing={1} id="payment-page">

        <Grid item xs={2}>
          <Timer />
        </Grid>
        <Grid item xs={7}>
          <ItemPaidBar group_cart={group_cart}/>
          <UserPaidBar />
        </Grid>
        <Grid item xs={3}>
          FEELING GENEROUS...?
          <Button variant="outlined" size="medium">PAY THE REST</Button>
        </Grid>
        <Grid item xs={2}>
          <UserList session_id={this.state.session_id}/>
        </Grid>
        <Grid item xs={7}>
          <Items group_cart={group_cart} />
        </Grid>
        <Grid item xs={3} container direction="column" justifyContent="flex-end">
          <Tip />
          <Bill session={session} />
        </Grid>

        <Grid item xs={12} container justifyContent="flex-end">
          <RedirectButton />
        </Grid>
      </Grid>
    )
  }
}

export default Payment;