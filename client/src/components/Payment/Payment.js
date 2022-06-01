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
import Grid from '@mui/material/Grid';
import { group_cart } from './sampleData/session.js';
import session from './sampleData/session.js';

import Button from '@mui/material/Button';

class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

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
          <UserList users={exampleData.results} />
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