import React from 'react';
import axios from 'axios';
import { Button, Stack } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PaymentIcon from '@mui/icons-material/Payment';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { Link }  from "react-router-dom";

class RedirectButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order_ready: false
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
    axios({
      method: 'put',
      url: `/session${this.state.session_id}/updateOrderPaid`,
    })
    // .then((results) => {
    //   console.log('results in updateOrderPaidAndTotalTip', results.data);
    // })
    .catch((err) => {
      console.log('error in handleOrderDone', err)
    })
  }

  checkOrderStatus() {
    // console.log('what?', this.props.session.total_paid, this.props.session.total_owed)
    if (this.props.session.total_paid >= this.props.session.total_owed) {
      this.setState({order_ready: true});
    }
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
        <Button variant="contained" endIcon={<ArrowCircleRightIcon />} onClick={this.handleOrderDone}>
          SUBMIT ORDER
        </Button>
      )
    }
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
      </Stack>
    )
  }
}

export default RedirectButton;