import React from 'react';
import {MenuItem, Menu} from '@mui/material';
import { Link }  from 'react-router-dom';

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
        <Link to="/protected/user" style={{'textDecoration': 'none', color: 'black'}}>
          <MenuItem onClick={this.props.handleClose}>Profile</MenuItem>
        </Link>

        <Link to="/protected/RestaurantList" style={{'textDecoration': 'none', color: 'black'}}>
          <MenuItem onClick={this.props.handleClose}>Restaurant</MenuItem>
        </Link>

        <Link to="/protected/Cart" style={{'textDecoration': 'none', color: 'black'}}>
          <MenuItem onClick={this.props.handleClose}>Cart</MenuItem>
        </Link>

        <Link to="/protected/payment" style={{'textDecoration': 'none', color: 'black'}}>
          <MenuItem onClick={this.props.handleClose}>Payment</MenuItem>
        </Link>

      </Menu>
    );
  }
}

export default DisplayMenuLeft;