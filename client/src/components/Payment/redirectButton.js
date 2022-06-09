import React from 'react';
import axios from 'axios';
import { Button, Stack } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PaymentIcon from '@mui/icons-material/Payment';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { Link }  from "react-router-dom";

import OrderModal from './orderModal.js';

class RedirectButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order_ready: false,
      orderModalOpen: false
    }
  }

  componentDidMount() {
    this.checkOrderStatus();
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.props.session !== prevProps.session) {
      this.checkOrderStatus();
    }
  }

  handleOrderDone() {
    this.setState({ orderModalOpen: true }, () =>
      axios({
        method: 'put',
        url: `/session${this.props.session.session_code}/updateOrderPaid`,
      })
      // .then((results) => {
      //   console.log('results in updateOrderPaid', results.data);
      // })
      .catch((err) => {
        console.log('error in handleOrderDone', err)
      })
    )
  }

  checkOrderStatus() {
    // console.log('what?', this.props.session.total_paid, this.props.session.total_owed)
    // if (this.props.session.total_paid >= this.props.session.total_owed) {
    //   this.setState({order_ready: true});
    // }
    axios.get(`/session${this.props.session.session_code}`)
    .then((session) => {
      let current_cart = session.data[0].group_cart;
      let result = true;
      // console.log('session?', session.data[0].group_cart);
      for (var key in current_cart) {
        if (current_cart[key]['paid?'] === false) {
          result = false;
          return;
        }
      }
      this.setState({order_ready: result});
    })
  }

  renderSubmitButton() {
    if (this.state.order_ready === false) {
      return (
        <Button variant="contained" disabled endIcon={<ArrowCircleRightIcon />} onClick={this.handleOrderDone}>
          SUBMIT ORDER
        </Button>
      )
    } else {
      return (
        <Button variant="contained" endIcon={<ArrowCircleRightIcon />} onClick={this.handleOrderDone.bind(this)}>
          SUBMIT ORDER
        </Button>
      )
    }
  }

  handleOrderModalClose() {
    this.setState({orderModalOpen: false});
  }

  render() {
    return (
      <Stack direction="row" spacing={2}>
        <Button variant="contained" endIcon={<ShoppingCartIcon />}>
          <Link to="/Cart" style={{'textDecoration': 'none', color: 'white'}}>
            BACK TO CART
          </Link>
        </Button>
        <Button variant="contained" endIcon={<PaymentIcon />} onClick={this.props.handlePay}>
          PAY SELECTED
        </Button>
        {this.renderSubmitButton()}
        <OrderModal
          ModalOpen={this.state.orderModalOpen}
          ModalClose={this.handleOrderModalClose.bind(this)}
          session={this.props.session}/>
      </Stack>
    )
  }
}

export default RedirectButton;