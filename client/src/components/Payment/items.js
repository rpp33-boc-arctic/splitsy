import React from 'react';
import Item from './item.js';
import { List } from '@mui/material';


class Items extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

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