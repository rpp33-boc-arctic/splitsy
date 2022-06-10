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
      // openNav: false,
      // isAuthenticated: false,
      openNavRight: null,
      openNavLeft: null
    };

    this.handleLogout = this.handleLogout.bind(this);
    this.handleOpenNavRight = this.handleOpenNavRight.bind(this);
    this.handleCloseNavRight = this.handleCloseNavRight.bind(this);
    this.handleOpenNavLeft = this.handleOpenNavLeft.bind(this);
    this.handleCloseNavLeft = this.handleCloseNavLeft.bind(this);
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.cookieData !== this.props.cookieData ) {
  //     // this.checkLoginStatus();
  //   }
  // }

  // componentDidMount() {
  //   // this.checkLoginStatus();
  // }

  // checkLoginStatus() {

  //   if (this.props.cookieData) {
  //     const { username, userId } = this.props.cookieData;
  //     console.log('cookieData is :', this.props.cookieData);

  //     if (username && userId) {
  //       this.setState({
  //         isAuthenticated: true
  //       });
  //     }

  //   } else {
  //     this.setState({
  //       isAuthenticated: false
  //     });
  //   }
  // }

  handleLogout() {
    axios.get('/logout')
      .then(() => {
        this.props.verifyUser();
        // this doesn't delete cookie on the broswer yet.
      });
  }

  // openNav(){
  //   this.setState({openNav:!this.state.openNav})
  // }  detectOffClick(e){
  //   var b1 = e.target.classList.contains('MuiTypography-root');
  //   var b2 = e.target.classList.contains('MuiList-root');
  //   var b3 = e.target.classList.contains('MuiBox-root');
  //   var b4 = e.target.classList.contains('bob');

  //   if (b1 || b2 || b3 || b4 ){
  //     // console.log("box is close")
  //     this.setState({openNav:false});
  //   } else {
  //     // console.log('not closed')
  //   }
  // }

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