import React from 'react';
import Item from './Item.js';
import { List } from '@mui/material';
import { menu } from './sampleData.js';


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

  // const divStyle={
  //   overflowY: 'scroll',
  //   border:'1px solid red',
  //   width:'500px',
  //   float: 'left',
  //   height:'500px',
  //   position:'relative'
  // };

  // margin-top: 20px;
  // overflow-y: scroll;
  // width: 600px;
  // max-height: 1100px;
  // /* overflow-y: scroll; */
  // overflow-y: auto;
  // overflow-x: auto;
  // scrollbar-color: rebeccapurple green;
  // scrollbar-width: thin;

  render() {
    console.log(menu);
    var items = menu.categories[0].menu_item_list.map((item, i) => {
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