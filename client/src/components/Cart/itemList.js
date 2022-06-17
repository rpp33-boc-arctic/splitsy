import React from 'react';
import Item from './Item.js';
import { List } from '@mui/material';
// import { menu } from './sampleData.js';


class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollerStyle: {
        overflowY: 'scroll',
        border:'1px solid red',
        width:'500px',
        float: 'left',
        height:'500px',
        // position:'relative'
      }
    }
  }

  render() {
    console.log(this.props.cart);
    var items = this.props.cart.map((item, i) => {
      return <Item item={item} key={i}/>
    })

    return (
      <div>
        <List style={this.state.scrollerStyle} >
        {items}
      </List>
      </div>

    )
  }
}


export default ItemList;