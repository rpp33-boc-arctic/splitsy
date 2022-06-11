import React from 'react';
import {MenuItem, Menu} from '@mui/material';

class DisplayMenuLeft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidUpdate (prevProps) {
    if (prevProps.anchorEl !== this.props.anchorEl) {
      this.render();
    }
  }

  render () {
    // console.log('this.props.cookies', this.props.anchorEl)
    return (
      <Menu
        anchorEl={this.props.anchorEl}
        open={Boolean(this.props.anchorEl)}
        onClose={this.props.handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
      <MenuItem component='a' href="/protected/user" onClick={this.props.handleClose}>Profile</MenuItem>
      <MenuItem component='a' href="/protected/RestaurantList" onClick={this.props.handleClose}>Restaurant</MenuItem>
      <MenuItem component='a' href="/protected/Cart" onClick={this.props.handleClose}>Cart</MenuItem>
      <MenuItem component='a' href="/protected/payment" onClick={this.props.handleClose}>Payment</MenuItem>
    </Menu>
    );
  }
}

export default DisplayMenuLeft;