import React from 'react';
import axios from 'axios';

import {Button, Typography, Toolbar, Box, AppBar, IconButton} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import {Outlet } from 'react-router-dom';
import DisplayMenuRight from './DisplayMenuRight.js';
import DisplayMenuLeft from './DisplayMenuLeft.js';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openNavRight: null,
      openNavLeft: null
    };

    this.handleLogout = this.handleLogout.bind(this);
    this.handleOpenNavRight = this.handleOpenNavRight.bind(this);
    this.handleCloseNavRight = this.handleCloseNavRight.bind(this);
    this.handleOpenNavLeft = this.handleOpenNavLeft.bind(this);
    this.handleCloseNavLeft = this.handleCloseNavLeft.bind(this);
  }

  handleLogout() {
    axios.get('/logout')
      .then(() => {
        this.props.verifyUser();
        // this doesn't delete cookie on the broswer yet.
      });
  }

  handleOpenNavLeft (event) {
    this.setState({
      openNavLeft: event.currentTarget
    });
  };

  handleCloseNavLeft (cb = () => {}) {
    this.setState({
      openNavLeft: null
    })
  }

  handleOpenNavRight (event) {
    this.setState({
      openNavRight: event.currentTarget
    });
  };

  handleCloseNavRight (cb = () => {}) {
    this.setState({
      openNavRight: null
    })
  }

  render() {

    var displayUser = this.props.cookieData ? this.props.cookieData.username :"Login";
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={this.handleOpenNavLeft}
            >
              <MenuIcon />
              <DisplayMenuLeft
                anchorEl={this.state.openNavLeft}
                handleClose={this.handleCloseNavLeft}
              />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Splitsy
            </Typography>
            <Button edge="end" color="inherit" aria-haspopup="true" aria-expanded="true" aria-controls="composition-menu" onClick={this.handleOpenNavRight}>
              {displayUser}
            </Button>
            <DisplayMenuRight
              anchorEl={this.state.openNavRight}
              handleClose={this.handleCloseNavRight}
              handleLogout={this.handleLogout}
            />

          </Toolbar>
        </AppBar>
        <Outlet />
      </Box>
    )
  }
}

export default NavBar;