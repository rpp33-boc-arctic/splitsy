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
import { Grid, Button } from '@mui/material';
import { group_cart } from './sampleData/session.js';
import session from './sampleData/session.js';
import _ from 'underscore';

class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      session_id: "",      //session id from cookie? or pass from other component
      username: "",       //from cookie (after session_cookie had verified)
      user_id:"",

      user_pick: [],
      others_pick: [],
      not_yet_pick: [],

      group_cart: {},
    }
  }

  //==========================     MAIN     ==========================
  componentDidMount () {
    this.initialize();
  }

  initialize () {
    // TODO... VERIFY SESSION
    // var session_cookie = '';      //get session cookie from broswer
    // verify username & session_cookie with database --> is this the same function that must be added to cart/ menu?
      // if session_cookie is not similar to session of this username in the database,
        // go back to log in page

    // TODO... RETRIVE FROM DB AFTER SESSION VERIFID
    var username = ""             //get from cookie broswer
    var userId = 10;               //get from cookie broswer
    var session_id = 1;           //get session_id fro cookie from browswer --> this must be created from dashboard 1) when host click start session, session_id is created and save into database, 2) when user join session, broswer will check session_id used to join with session_id in database 3) if joined. All user will have the same state that collect all sessions information.

    this.setState({
      session_id: session_id,
      username: username,
      user_id: userId
    }, () => {
      axios.get(`/session${this.state.session_id}/group_cart`)
        .then((group_cart) => {
          this.setState({
            group_cart: group_cart.data[0].group_cart,
            not_yet_pick: Object.keys(group_cart.data[0].group_cart)
          }, () => {
            this.updateItemsOnMainBoard()
          })
        })
        .catch((err) => {
          console.log('Error retrive GET group_cart', err);
        })

    })
  }

  handleAddToCart (order_item_id) {
    this.updateItemsOnMainBoard(() => {
      if (this.state.not_yet_pick.has(order_item_id)) {
        axios.put(`/session${this.state.session_id}/user${this.state.user_id}/cart`, { order_item_id: order_item_id })
          .then(() => {
            this.updateItemsOnMainBoard();
          })
          .catch((err) => {
            console.log('Error PUT item in DB user_cart', err);
          })
      }
    });
  }

  handleRemoveFromCart (order_item_id) {
    this.updateItemsOnMainBoard(() => {
      if (this.state.user_pick.has(order_item_id)) {
        axios.delete(`/session${this.state.session_id}/user${this.state.user_id}/cart`, { data: {order_item_id: order_item_id} })
          .then((result) => {
            this.updateItemsOnMainBoard();
          })
          .catch((err) => {
            console.log('Error DELETE item in DB user_cart', err);
          })
      }
    });
  }

  addAllNonPickedToCart () {
    this.updateItemsOnMainBoard(() => {
      this.state.not_yet_pick.forEach((order_item_id) => {
        this.handleAddToCart(order_item_id);
      })
    });
  }

  handlePay() {
    console.log('Pay!');
    this.updateUserPay();
    this.updateReceipt();
  }

  //==========================     HELPER     ==========================
  updateItemsOnMainBoard (callback = () => {}) {
    axios.get(`/session${this.state.session_id}/users`)
      .then((users) => {

        users = users.data[0].users
        var all_item = Object.keys(this.state.group_cart).map((item) => {return Number(item)});
        var others_item = [];
        var my_item = [];
        var all_chosen_item = [];
        var non_chosen_item = [];

        for (var userId in users) {
          if (Number(userId) !== this.state.user_id) {
            others_item =  new Set([...others_item, ...users[userId].user_cart])
          }

          if (Number(userId) ===  this.state.user_id) {
            my_item = new Set([...my_item, ...users[userId].user_cart]);
          }
        }

        all_chosen_item = [...my_item, ...others_item];
        non_chosen_item = new Set(_.difference(all_item, all_chosen_item));


        this.setState({
          user_pick: my_item,
          others_pick: others_item,
          not_yet_pick: non_chosen_item
        }, () => {
          callback();
        })
      })
      .catch((err) => {
        console.log('error in handleItemPick', err)
      })
  }

  getPrice (order_item_id) {
    return this.state.group_cart[order_item_id].menu_item_price;
  }

  updateUserPay() {
    axios({
      method: 'put',
      url: `/session${this.state.session_id}/user${this.state.user_id}/pay`,
      // url: `/session${this.state.session_id}/user120/pay`,
    })
    .then((results) => {
      console.log('results', results.data);
    })
  }

  updateReceipt() {
    // axios({
    //   method: 'put',
    //   // url: `/session${this.state.session_id}/user${this.state.user_id}/receipt`,
    //   url: `/session${this.state.session_id}/user120/receipt`,
    //   data: {
    //     usercart: [6], // this.state.user_pick,
    //     usertip: 5,
    //     userpaid: 25
    //   }
    // })
    // .then((results) => {
    //   console.log('results', results.data);
    // })
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
          <Button variant="outlined" size="medium" onClick={this.addAllNonPickedToCart.bind(this)}>PAY THE REST</Button>
        </Grid>

        <Grid item xs={2}>
          <UserList session_id={this.state.session_id}/>
        </Grid>

        <Grid item xs={7}>
          <Items
            username={this.state.username}
            session_id={this.state.session_id}
            user_id={this.state.user_id}
            group_cart={this.state.group_cart}
            user_pick={this.state.user_pick}
            others_pick={this.state.others_pick}
            not_yet_pick={this.state.not_yet_pick}
            addToCart={this.handleAddToCart.bind(this)}
            removeFromCart={this.handleRemoveFromCart.bind(this)} />
        </Grid>

        <Grid item xs={3} container direction="column" justifyContent="flex-end">
          <Tip />
          <Bill session={session} />
        </Grid>

        <Grid item xs={12} container justifyContent="flex-end">
          <RedirectButton handlePay={this.handlePay.bind(this)}/>
        </Grid>
      </Grid>
    )
  }
}

export default Payment;