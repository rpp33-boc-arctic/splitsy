import React from 'react';
import MenuItem from './menuItem.js';
import { List } from '@mui/material';
import sampleData from './sampleData.js';
import menuStyles from './menuStyles.css';


class MenuItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollerStyle: {
        overflowY: 'scroll',
				// overflowY: 'hidden',
        border:'1px solid grey',
        width:'1300px',
        float: 'left',
        height:'800px',
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
    var items = sampleData.menu.categories[5].menu_item_list.map((item, i) => {
      return <MenuItem item={item} key={i}/>
    })

    return (
      <div>
        <List className='example' style={this.state.scrollerStyle} >
        {items}
      </List>
      </div>

    )
  }
}


export default MenuItemList;