import React from 'react';
import SubmenuItem from './menuItem.js';
import { List } from '@mui/material';
import sampleData from './sampleData.js';
// import menuStyles from './menuStyles.css';


class FullMenuList extends React.Component {
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

  render() {
    var items = sampleData.menu.categories[5].menu_item_list.map((item, i) => {
      return <SubmenuItem item={item} key={i}/>
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


export default FullMenuList;