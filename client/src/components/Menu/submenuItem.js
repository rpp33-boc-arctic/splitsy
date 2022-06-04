import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
// import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';

class SubmenuItem extends React.Component {
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
						{/* <Button variant="outlined">{this.state.quantity}</Button> */}
						<img className='menu-photo' src={this.props.item.image} alt='food pic' width='200' height='200'></img>
						<div className='menu-item-container'>
							<div className='menu-item-top'>
								<ListItemText
									primary={this.props.item.name}
									// {this.props.item.description}
									secondary={
										<>
											{this.props.item.description}

										</>
									}
								/>
							</div>
							<div className='menu-item-bottom' >
								<ListItemText className='item-price'	primary={'$' + this.props.item.price} />
								<Button className='menu-button' variant="contained">Add to Cart</Button>
							</div>
						</div>



					</ListItemButton>
				</ListItem>
				<Divider className='menu-divider'/>
			</>
		)
	}
}


export default SubmenuItem;