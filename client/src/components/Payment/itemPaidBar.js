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
    return (
    <div id="item-paid-bar">
      <Stack direction="row" spacing={1}>
        <Typography mb={2} variant="body2">ITEMS PAID</Typography>
        {Object.values(this.props.group_cart).map((item, i) => (
          <ItemPaid item={item} key={i}/>
        ))}
      </Stack>
    </div >
    )
  }
}


export default ItemPaidBar;