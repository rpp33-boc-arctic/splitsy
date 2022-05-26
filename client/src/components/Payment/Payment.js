import React from 'react';
import Timer from './timer.js';
import UserList from './userList.js';
import ItemPaidBar from './itemPaidBar.js';
import UserPaidBar from './userPaidBar.js';
import Items from './items.js';
import Tip from './tip.js';
import Bill from './bill.js';

class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div >
        **Payment Page starts here**
        <Timer/>
        <UserList/>
        <ItemPaidBar/>
        <UserPaidBar/>
        <Items/>
        <Tip/>
        Feeling Generous?
        <Bill/>
        <button>Back to Cart</button>
        <button>Submit</button>
      </div >
    )
  }
}

export default Payment;