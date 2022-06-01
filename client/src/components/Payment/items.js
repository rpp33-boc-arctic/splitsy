import React from 'react';
import Item from './item.js';
import { List } from '@mui/material';


class Items extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  //==========================     PROPS     ==========================
  // username: "nick"
  // group_cart: { 1: {order_item_id:  …., menu_item_id: …., }, 2: {}, 3: {}, 4: {}, …}
  // session_id: "01"
  // updateItemsOnMainBoard: function

  //==========================     MAIN     ==========================
  clickItem () {

  }

  unClickItem () {

  }

  //==========================     HELPER     ==========================
  getClicked_order_item_id () {

  }

  //==========================     RENDER     ==========================
  render() {
    var items = Object.values(this.props.group_cart).map((item, i) => {
      return <Item item={item} key={i}/>
    })

    return (
      <List sx={{ overflow: 'auto', maxHeight: 500 }}>
        {items}
      </List>
    )
  }
}


export default Items;