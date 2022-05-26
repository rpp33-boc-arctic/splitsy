import React from 'react';
import Timer from './timer.js';
import UserList from './userList.js';
import ItemPaidBar from './itemPaidBar.js';
import UserPaidBar from './userPaidBar.js';
import Items from './items.js';
import Tip from './tip.js';
import Bill from './bill.js';
import RedirectButton from './redirectButton.js';
import exampleData from './sampleData/userList.js';

class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div id="payment-page">
        **Payment Page starts here**
        <Timer/>
        <UserList users={exampleData.results}/>
        <ItemPaidBar/>
        <UserPaidBar/>
        <Items/>
        <Tip/>
        Feeling Generous?
        <Bill/>
        <RedirectButton/>
      </div >
    )
  }
}

export default Payment;