import React from 'react';

import {Button, Typography, Toolbar, Box, AppBar, ListItem, List, Divider, ListItemText, IconButton} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {Link} from "react-router-dom";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.isAuthenticated = true;
    this.user = "Grant_22";
    this.state = {openNav:false}

    this.displayNav = this.displayNav.bind(this);
    this.openNav = this.openNav.bind(this);
  }

  displayNav(){
    const style = {
      width: '100%',
      position:"relative",
      // bgcolor: 'background.paper',
    };
   return ( <List  sx={style}  aria-label="mailbox folders" style={{left:'0px', position:'relative',top:'0', width:'400px', height:"auto", background:'#1976d2'}}>
    {this.isAuthenticated? <ListItem button component={Link}  to='/auth' style={{marginLeft:"0px", height:"50px",color:"white"}} primary="profile" > <ListItemText primary="Profile" /> </ListItem>: null}
    <Divider />

    {this.isAuthenticated? <ListItem button component={Link}  to='/logout' style={{marginLeft:"0px", height:"50px",color:"white"}} primary="logout" > <ListItemText primary="LOGOUT" /> </ListItem>:  <ListItem button component={Link}  to='/login' style={{marginLeft:"20px", height:"50px",color:"white"}} primary="login" > <ListItemText primary="LOGIN" /> </ListItem>}

      </List>
   )
  }
  openNav(){
    this.setState({openNav:!this.state.openNav})
  }

  detectOffClick(e){
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
      <Box  className="nav_container" onClick={e=>{this.detectOffClick(e)}} sx={{ flexGrow: 1 }}>
      <AppBar  position="static">
        <Toolbar style={{position:'relative'}}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={this.openNav}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
           <Link to="/" className="bob"  style={{color:"white",textDecoration:"none"}}> Splitsy</Link>
          </Typography>
          {this.isAuthenticated? <Link className="bob"  to="/userProfile" style={{color:"white",textDecoration:"none"}}> {this.user} </Link>: null}
          <Button color="inherit"> {this.isAuthenticated? <Link  className="bob"  to="/logout" style={{color:"white",textDecoration:"none"}} >LOGOUT</Link>:<Link  to="/Auth" style={{color:"white",textDecoration:"none"}} >LOGIN</Link> } </Button>
        </Toolbar>
      </AppBar>
      {this.state.openNav? this.displayNav():null}
    </Box>
    )
  }
}

export default NavBar;