import React from 'react';
import Item from './item.js';
import { List } from '@mui/material';
import { group_cart } from './sampleData/session.js'


class Items extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    console.log(group_cart);
    var items = group_cart.map((item, i) => {
      return <Item item={item} key={i}/>
    })

    return (
      <List >
        {items}
      </List>
    )
  }
}


export default Items;