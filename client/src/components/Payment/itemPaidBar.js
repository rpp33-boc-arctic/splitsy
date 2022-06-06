import React from 'react';
import ItemPaid from './itemPaid.js';
import { Stack, Typography } from '@mui/material';

class ItemPaidBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    var itemList = Object.values(this.props.group_cart).sort((a, b) => {return a.user_id - b.user_id});

    return (
    <div id="item-paid-bar">
      <Stack direction="row" spacing={1}>
        <Typography mb={2} variant="body2">ITEMS PAID</Typography>
        {itemList.map((item, i) => (
          <ItemPaid item={item} key={i}/>
        ))}
      </Stack>
    </div >
    )
  }
}


export default ItemPaidBar;