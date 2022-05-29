/* eslint-disable jsx-a11y/alt-text */


import React from 'react';
import './list.scss'
import {ListItem,List,Divider,ListItemText} from '@mui/material';
// import { styled } from '@mui/material/styles';


class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }


  render() {
    const style = {
      width: '100%',
      position:"relative",
      bgcolor: 'background.paper',
    };
    return (

      <div className="list-ct">
         <List  sx={style} component="nav" aria-label="mailbox folders">
  <ListItem className="item" button style={{height:"150px", border:"1px solid black"}}>
    <div className="img-ct">
        <img className="image" src="https://paintings.pinotspalette.com/some-beach-tv.jpg?v=10037325"></img>
    </div>

    <ListItemText style={{marginLeft:"20px"}} primary="this is an amazing palm tree to eat. it has soo much flavor. it will melt your mouth. has tomatoes lettece onions and palm juice. with a big piece of meat" />


  </ListItem>
  <Divider />

  <ListItem className="item" button style={{height:"150px", border:"1px solid black"}}>
    <div className="img-ct">
        <img className="image" src="https://paintings.pinotspalette.com/some-beach-tv.jpg?v=10037325"></img>
    </div>

    <ListItemText style={{marginLeft:"20px"}} primary="this is an amazing palm tree to eat. it has soo much flavor. it will melt your mouth. has tomatoes lettece onions and palm juice. with a big piece of meat" />


  </ListItem>
  <Divider />
  <ListItem className="item" button style={{height:"150px", border:"1px solid black"}}>
    <div className="img-ct">
        <img className="image" src="https://paintings.pinotspalette.com/some-beach-tv.jpg?v=10037325"></img>
    </div>

    <ListItemText style={{marginLeft:"20px"}} primary="this is an amazing palm tree to eat. it has soo much flavor. it will melt your mouth. has tomatoes lettece onions and palm juice. with a big piece of meat" />


  </ListItem>
  <Divider />
  <ListItem className="item" button style={{height:"150px", border:"1px solid black"}}>
    <div className="img-ct">
        <img className="image" src="https://paintings.pinotspalette.com/some-beach-tv.jpg?v=10037325"></img>
    </div>

    <ListItemText style={{marginLeft:"20px"}} primary="this is an amazing palm tree to eat. it has soo much flavor. it will melt your mouth. has tomatoes lettece onions and palm juice. with a big piece of meat" />


  </ListItem>
  <Divider />
  <ListItem className="item" button style={{height:"150px", border:"1px solid black"}}>
    <div className="img-ct">
        <img className="image" src="https://paintings.pinotspalette.com/some-beach-tv.jpg?v=10037325"></img>
    </div>

    <ListItemText style={{marginLeft:"20px"}} primary="this is an amazing palm tree to eat. it has soo much flavor. it will melt your mouth. has tomatoes lettece onions and palm juice. with a big piece of meat" />


  </ListItem>
  <Divider />
  <ListItem className="item" button style={{height:"150px", border:"1px solid black"}}>
    <div className="img-ct">
        <img className="image" src="https://paintings.pinotspalette.com/some-beach-tv.jpg?v=10037325"></img>
    </div>

    <ListItemText style={{marginLeft:"20px"}} primary="this is an amazing palm tree to eat. it has soo much flavor. it will melt your mouth. has tomatoes lettece onions and palm juice. with a big piece of meat" />


  </ListItem>
  <Divider />
  <ListItem className="item" button style={{height:"150px", border:"1px solid black"}}>
    <div className="img-ct">
        <img className="image" src="https://paintings.pinotspalette.com/some-beach-tv.jpg?v=10037325"></img>
    </div>

    <ListItemText style={{marginLeft:"20px"}} primary="this is an amazing palm tree to eat. it has soo much flavor. it will melt your mouth. has tomatoes lettece onions and palm juice. with a big piece of meat" />


  </ListItem>
  <Divider />
</List>


      </div>
    )
  }
}

export default Map;