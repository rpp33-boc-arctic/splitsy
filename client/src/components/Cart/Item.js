import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';

// import ListItemIcon from '@mui/material/ListItemIcon';



import Divider from '@mui/material/Divider';

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
			quantity: 3
    }
  }


  render() {
    return (
      <>
        <ListItem disablePadding>
          <ListItemButton component="a" href="#simple-list">
						{/* <ListItemIcon>
							{this.props.item.image}
						</ListItemIcon> */}
						<Button variant="outlined">{this.state.quantity}</Button>
						<img src={this.props.item.image} alt='food pic' width='100' height='100'></img>
            <ListItemText
              primary={this.props.item.name}
              secondary={
                <>
								<Button variant="text">Edit</Button>
									   Price: {this.props.item.price}
                </>
              }
            />
          </ListItemButton>
        </ListItem>
        <Divider/>
      </>
    )
  }
}


export default Item;