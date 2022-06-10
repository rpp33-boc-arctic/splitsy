import React from 'react';
import axios from 'axios';

import {Button, Typography, Toolbar, Box, AppBar, ListItem, List, Divider, ListItemText, IconButton} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import {Link, Outlet } from 'react-router-dom';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openNav: false,
      isAuthenticated: false
    };

    this.displayNav = this.displayNav.bind(this);
    this.openNav = this.openNav.bind(this);
    this.checkLoginStatus = this.checkLoginStatus.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.cookieData !== this.props.cookieData) {
      this.checkLoginStatus();
    }
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  checkLoginStatus() {

    if (this.props.cookieData) {
      const { username, userId } = this.props.cookieData;
      console.log('cookieData is :', this.props.cookieData);

      if (username && userId) {
        this.setState({
          isAuthenticated: true
        });
      }

    } else {
      this.setState({
        isAuthenticated: false
      });
    }
  }

  handleLogout() {
    axios.get('/logout')
      .then(() => {
        this.props.verifyUser();
      });
  }

  displayNav(){
    const style = {
      width: '100%',
      position:"relative",
      // bgcolor: 'background.paper',
    };
   return ( <List  sx={style}  aria-label="mailbox folders" style={{left:'0px', position:'relative',top:'0', width:'400px', height:"auto", background:'#1976d2'}}>
    {this.state.isAuthenticated? <ListItem button component={Link}  to='/' style={{marginLeft:"0px", height:"50px",color:"white"}} primary="profile" > <ListItemText primary="Profile" /> </ListItem>: null}
    <Divider />

    {this.state.isAuthenticated? <ListItem button onClick={this.handleLogout} style={{marginLeft:"0px", height:"50px",color:"white"}} primary="logout" > <ListItemText primary="LOGOUT" /> </ListItem>:  <ListItem button component={Link}  to='/' style={{marginLeft:"20px", height:"50px",color:"white"}} primary="login" > <ListItemText primary="LOGIN" /> </ListItem>}

      </List>
   )
  }

  openNav(){
    this.setState({openNav:!this.state.openNav})
  }  detectOffClick(e){
    var b1 = e.target.classList.contains('MuiTypography-root');
    var b2 = e.target.classList.contains('MuiList-root');
    var b3 = e.target.classList.contains('MuiBox-root');
    var b4 = e.target.classList.contains('bob');

    if (b1 || b2 || b3 || b4 ){
      // console.log("box is close")
      this.setState({openNav:false});
    } else {
      // console.log('not closed')
    }
  }
  render() {

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
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Splitsy
            </Typography>
            <Button color="inherit" onClick={this.displayNav}>Login/User</Button>
          </Toolbar>
        </AppBar>
        <Outlet />
      </Box>
    )
  }
}

export default NavBar;