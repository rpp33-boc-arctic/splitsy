import React from 'react';
import axios from 'axios';
import Timer from './timer.js';
import UserList from './userList.js';
import ItemPaidBar from './itemPaidBar.js';
import UserPaidBar from './userPaidBar.js';
import Items from './items.js';
import Bill from './bill.js';
import RedirectButton from './redirectButton.js';
import PayModal from './payModal.js';
import { Grid, Button, CircularProgress, Typography} from '@mui/material';
import _ from 'underscore';

class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      session_id: "",
      username: "",
      user_id:"",

      user_pick: new Set(),
      others_pick: new Set(),
      not_yet_pick: new Set(),

      group_cart: {},
      session: {},

      myBill: {
        myTip: 0,
        myTotal: 0
      },

      users: [],

      payModalOpen: false,
      waitingForData: true
    }
  }

  //==========================     MAIN     ==========================
  componentDidMount () {
    this.initialize();
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.state.waitingForData !== prevState.waitingForData) {
      this.updateItemsOnMainBoard();
    }
  }
  initialize () {
    var username = this.props.cookieData.username;
    var userId = this.props.cookieData.userId;
    var session_id = this.getCookie('session_code');

    this.setState({
      session_id: session_id,
      username: username,
      user_id: userId
    }, () => {
      axios.get(`/session${this.state.session_id}`)
        .then((session) => {
          if (!session) {
            throw session;
          }
          this.setState({
            waitingForData: false,
            group_cart: session.data[0].group_cart,
            not_yet_pick: Object.keys(session.data[0].group_cart),
            session: session.data[0]
          }, () => {
            this.updateItemsOnMainBoard()
          })
        })
        .catch(() => {
          this.setState({waitingForData: true}, () => {this.initialize()})
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
            alert("We cannot add this item to cart now, please try again");
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
            alert("We cannot remove this item from cart now, please try again");
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
    this.setState({ payModalOpen: true });
    this.updateUserPay();
    this.updateItemPay();
    this.updateReceipt();
    this.updateTotalTipAndTotalPaid();
  }

    handlePayModalClose() {
    this.setState({payModalOpen: false}, this.initialize());
  }

  //==========================     HELPER     ==========================
  updateItemsOnMainBoard (callback = () => {}) {
    axios.get(`/session${this.state.session_id}/users`)
      .then((users) => {

        users = users.data[0].users
        var all_item = Object.keys(this.state.group_cart).map((item) => {return Number(item)});
        var others_item = new Set();
        var my_item = new Set();
        var all_chosen_item = [];
        var non_chosen_item = new Set();

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
          waitingForData: false,
          user_pick: my_item,
          others_pick: others_item,
          not_yet_pick: non_chosen_item
        }, () => {
          callback();
        })
      })
      .catch((err) => {
        this.setState({waitingForData: true}, () => {this.initialize()})
      })
  }

  getPrice (order_item_id) {
    return this.state.group_cart[order_item_id].menu_item_price;
  }

  updateMybill (tip, total) {
    this.setState({
      myBill: {
        myTip: tip,
        myTotal: total
      }
    })
  }

  updateUserPay() {
    axios({
      method: 'put',
      url: `/session${this.state.session_id}/user${this.state.user_id}/pay`,
    })
    .catch((err) => {
      console.log('error in updateUserPay', err)
    })
  }

  updateItemPay () {
    // update item_paid in group_cart
    axios({
      method: 'put',
      url: `/session${this.state.session_id}/user${this.state.user_id}/item_paid`,
    })
    .catch((err) => {
      console.log('error in updateItemPay', err)
    })
  }

  updateReceipt() {
    axios({
      method: 'put',
      url: `/session${this.state.session_id}/user${this.state.user_id}/receipt`,
      data: {
        userCart: [...this.state.user_pick],
        userTip: this.state.myBill.myTip,
        userTotal: this.state.myBill.myTotal
      }
    })
    .catch((err) => {
      console.log('error in updateReceipt', err)
    })
  }

  updateTotalTipAndTotalPaid() {
    let update_tip = this.state.session.total_tip + this.state.myBill.myTip;
    let myBill_notip = this.state.myBill.myTotal - this.state.myBill.myTip;
    let update_total_paid = this.state.session.total_paid + myBill_notip;
    axios({
      method: 'put',
      url: `/session${this.state.session_id}/updateTotalTipAndTotalPaid`,
      data: {
        update_tip: update_tip,
        update_total_paid: update_total_paid
      }
    })
    .catch((err) => {
      console.log('error in updateTotalTipAndTotalPaid', err)
    })
  }

  updateUserMap (users) {
    this.setState({users: users});
  }

  getUsername (user_id) {
    var user = _.find(this.state.users, (user) => { return user.user_id === user_id });
    if (user) return user.username;
  }

  getCookie(key) {
    var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
  }

  //==========================     RENDER     ==========================
  render() {
    if (this.state.waitingForData) {return (<CircularProgress />)}
    return (
      <Grid container spacing={1} id="payment-page" p={3} mt={1}>

        <Grid item xs={2} p={2}>
          <Timer />
        </Grid>

        <Grid item xs={7} p={2}>
          <ItemPaidBar group_cart={this.state.group_cart}/>
          <UserPaidBar session={this.state.session}/>
        </Grid>

        <Grid item xs={3} p={2}>
          <Typography mb={1}>FEELING GENEROUS...?</Typography>
          <Button
            variant="outlined"
            size="medium"
            onClick={this.addAllNonPickedToCart.bind(this)}>
            PAY THE REST
          </Button>
        </Grid>

        <Grid item xs={2} p={2}>
          <UserList
            session_id={this.state.session_id}
            updateUserMap={this.updateUserMap.bind(this)}
            user_id={this.state.user_id}/>
        </Grid>

        <Grid item xs={7} p={2}>
          <Items
            username={this.state.username}
            session_id={this.state.session_id}
            user_id={this.state.user_id}
            group_cart={this.state.group_cart}
            user_pick={this.state.user_pick}
            others_pick={this.state.others_pick}
            not_yet_pick={this.state.not_yet_pick}
            addToCart={this.handleAddToCart.bind(this)}
            removeFromCart={this.handleRemoveFromCart.bind(this)}
            getUsername={this.getUsername.bind(this)} />
        </Grid>

        <Grid item xs={3} container direction="column" justifyContent="flex-end" p={2}>
          <Bill
            session={this.state.session}
            user_pick={this.state.user_pick}
            getPrice={this.getPrice.bind(this)}
            updateMybill={this.updateMybill.bind(this)} />
        </Grid>
        <Grid item xs={12} container justifyContent="flex-end" p={2}>
          <RedirectButton
            handlePay={this.handlePay.bind(this)}
            session={this.state.session}/>
          <PayModal
            ModalOpen={this.state.payModalOpen}
            ModalClose={this.handlePayModalClose.bind(this)}
            myTotal={this.state.myBill.myTotal}
           />
        </Grid>
      </Grid>
    )
  }
}

export default Payment;