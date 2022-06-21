import React from 'react';
import { MenuItem, Menu } from '@mui/material';
import { Link }  from 'react-router-dom';

class DisplayMenuRight extends React.Component {
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

      <Link to="/" style={{'textDecoration': 'none', color: 'black'}}>
        <MenuItem onClick={this.props.handleLogout}>Logout</MenuItem>
      </Link>

    </Menu>
    );
  }
}

export default DisplayMenuRight;