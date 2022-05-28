import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <>
        <ListItem disablePadding>
          <ListItemButton component="a" href="#simple-list">
            <ListItemText
              primary={this.props.item.menu_item_name}
              secondary={
                <>
                  Ordered by: {this.props.item.user_id}   Price: {this.props.item.menu_item_price}
                </>
              }
            />
          </ListItemButton>
        </ListItem>
        <Divider/>
      </>
    )
  }
}

export default Item;