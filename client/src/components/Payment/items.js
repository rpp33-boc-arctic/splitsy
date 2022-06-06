import React from 'react';
import Item from './item.js';
import { List, CircularProgress } from '@mui/material';


class Items extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: ""
    }
  }
  //==========================     PROPS     ==========================
  // username: "nick"
  // user_id:
  // group_cart: { 1: {order_item_id:  …., menu_item_id: …., }, 2: {}, 3: {}, 4: {}, …}
  // session_id: "01"

  // updateItemsOnMainBoard: function
  // addToCart : function
  // removeFromCart: function

  // user_pick: [],
  // others_pick: [],
  // not_yet_pick: [],

  componentDidUpdate (prevProps, prevState) {
    if (this.props.user_pick !== prevProps.user_pick || this.props.others_pick !== prevProps.others_pick) {
      this.initialize();
      // console.log('this.props.user_pick', this.props.user_pick)
    }
  }

  initialize () {
    var items = Object.values(this.props.group_cart).map((item, i) => {
      item.username = this.props.getUsername(item.user_id)

      if (this.props.user_pick.has(item.order_item_id)) {
        return <Item item={item} key={i} selected={true} handleClick={this.unClickItem.bind(this)}/>
      } else if (this.props.others_pick.has(item.order_item_id) || item['paid?'] === true) {
        return <Item item={item} key={i} selected={false} disabled={true} />
      } else {
        return <Item item={item} key={i} selected={false} handleClick={this.clickItem.bind(this)}/>
      }
    })
    this.setState({
      items: items
    })
  }

  clickItem (order_item_id) {
    this.props.addToCart(order_item_id);
  }

  unClickItem (order_item_id) {
    this.props.removeFromCart(order_item_id)
  }

  //==========================     RENDER     ==========================
  render() {
    if (!this.props.user_pick) {
      return (<CircularProgress />);
    } else {
      return (
        <List sx={{ overflow: 'auto'}}>
          {this.state.items}
        </List>
      )
    }
  }
}


export default Items;