import React from 'react';
import SubmenuItem from './submenuItem.js';
import { List, Button } from '@mui/material';
import sampleData from './sampleData.js';
import menuStyles from './menuStyles.css';


class SubmenuItemList extends React.Component {
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
      },
      showSubmenu: false
    }
    this.onSubmenuClick = this.onSubmenuClick.bind(this);
    this.displaySubmenu = this.displaySubmenu.bind(this);

  }

  onSubmenuClick() {
    this.setState({
      showSubmenu: !this.state.showSubmenu
    });
  }

  displaySubmenu() {
     return this.props.submenu.menu_item_list.map((item, i) => {
      return <div>
      <SubmenuItem item={item} key={i}/>
      </div>
    })
    // return <SubmenuItem />
  }

  render() {
    // var items = sampleData.menu.categories[5].menu_item_list.map((item, i) => {
    //   return <SubmenuItem item={item} key={i}/>
    // })
		// console.log('menuStyles: ', menuStyles.toString().slice(0,1));
    console.log('submenu is: ', this.props.submenu);

    return (

      <div>
        {/* <List className='example' style={this.state.scrollerStyle} >
        {items}
      </List> */}
      <Button onClick={this.onSubmenuClick}>{this.props.submenu.name}</Button>
      {
        this.state.showSubmenu?
        <div>Submenu: {this.displaySubmenu()} </div> :
        null
      }
      </div>

    )
  }
}


export default SubmenuItemList;


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