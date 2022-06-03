import React from 'react';
import { ListItem, ListItemButton, ListItemText, Divider, Typography } from '@mui/material';

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  // props.item.menu_item_description
              // menu_item_id
              // menu_item_name
              // menu_item_photo
              // menu_item_price
              // order_item_id
              // paid?
              // user_id
  // props.selected
  // props.disabled

  //TODO
  // item haven't show user yet// must wait for userlist fetch from db, then use the same one from Yufang to map id with username in <item>

  render() {
    return (
      <>
        <ListItem disablePadding secondaryAction={
          <Typography>${this.props.item.menu_item_price.toLocaleString(undefined, {maximumFractionDigits:2})}</Typography>
        }>
          <ListItemButton
            selected={this.props.selected}
            disabled={this.props.disabled}
            onClick={() => {this.props.handleClick(this.props.item.order_item_id)}} >
            <ListItemText
              primary={this.props.item.menu_item_name}
              secondary={ <> Ordered by: {this.props.item.username} </> }
            />
          </ListItemButton>
        </ListItem>
        <Divider/>
      </>
    )
  }
}


export default Item;