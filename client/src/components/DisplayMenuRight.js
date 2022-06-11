import React from 'react';
import {MenuItem, Menu} from '@mui/material';

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
      <MenuItem component='a' href="/protected/user" onClick={this.props.handleClose}>Profile</MenuItem>
      <MenuItem onClick={this.props.handleLogout}>Logout</MenuItem>
    </Menu>
    );
  }
}

export default DisplayMenuRight;