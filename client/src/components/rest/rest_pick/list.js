/* eslint-disable jsx-a11y/alt-text */


import React from 'react';
import './list.scss'
import {ListItem,List,Divider,ListItemText} from '@mui/material';
// import { styled } from '@mui/material/styles';


class Map extends React.Component {
  constructor(props) {
    super(props);
    console.log()
    this.generateList = this.generateList.bind(this);
  }


  generateList(){
    if (this.props.rest.length === 0 ){
      return null;
    }
    return this.props.rest.map((item,index)=>{
      var retryindex=1;
      return  ( <React.Fragment><ListItem key={index} className="item" button style={{height:"150px", border:"1px solid black"}}>
      <div className="img-ct">
          <img className="image" src={item.logo_photos[0]}  onError={({ currentTarget }) => {
    currentTarget.onerror = null; // prevents looping
    if (item.name === "Filibertos"){
      currentTarget.src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/6988e88090863.560b715195e05.jpg";
    } else {
    if (item.logo_photos[retryindex]){
      currentTarget.src=item.logo_photos[retryindex];
    }
    retryindex+=1
  }

  }}></img>
      </div>
      <div className="cusines">
        </div>
      <ListItemText style={{marginLeft:"20px"}} primary={`name: ${item.name} `} />
      <ListItemText style={{marginLeft:"20px"}}  primary={`open: ${item.is_open? "yes":"no"}`} />
      <ListItemText style={{marginLeft:"20px", display:"block", width:"100%"}}  primary={`city: ${item.address['city']} street: ${item.address['street_addr']}  zipcode: ${item.address['zipcode']}`} />

     </ListItem>
      <Divider />
      </React.Fragment>
    )
    })

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
           {this.generateList()}
        </List>


      </div>
    )
  }
}

export default Map;