import React from 'react';
import SubmenuItem from './menuItem.js';
import SubmenuItemList from './submenuItemList.js';
import { List, Button } from '@mui/material';
import sampleData from './sampleData.js';
import menuStyles from './menuStyles.css';


class FullMenu extends React.Component {
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
			// showComponent: false
    }
		// this.onMenuCardClick = this.onMenuCardClick.bind(this);
  }

	// onMenuCardClick() {
	// 	this.setState({
	// 		showComponent: !this.state.showComponent
	// 	});
	// }

  render() {
    var items = this.props.fullMenu.menu.categories.map((item, i) => {
      return <div>
						{/* <submenuItemList submenu={item} key={i} />
						<p>{item.name}</p> */}
						{
						<SubmenuItemList submenu={item} key={i} />
						}
			</div>
    })
		// console.log('menuStyles: ', menuStyles.toString().slice(0,1));
		console.log('this.props.fullMenu is: ', this.props.fullMenu);
    return (

      <div>
        <List className='example' style={this.state.scrollerStyle} >
        {items}
      </List>
      </div>

    )
  }
}


export default FullMenu;