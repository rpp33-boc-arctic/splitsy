import React from 'react';
import ItemPaid from './itemPaid.js';
import Stack from '@mui/material/Stack';

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
        ITEMS PAID
        <br></br>
        {this.props.group_cart.map((item, i) => (
          <ItemPaid item={item} key={i}/>
        ))}
      </Stack>
    </div >
    )
  }
}


export default ItemPaidBar;