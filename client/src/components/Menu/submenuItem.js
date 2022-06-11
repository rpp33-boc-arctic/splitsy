import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
// import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
// import Cart from '../Cart/Cart.js';

class SubmenuItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			quantity: 0,
			add_to_cart: [],
			session_id: 1
		}
		this.addCurrentItemToCart = this.addCurrentItemToCart.bind(this);
		this.addToGroupCart = this.addToGroupCart.bind(this);
	}

	addCurrentItemToCart() {
		var item = this.props.item;
		// var item = 'hi';
		this.props.addToCart(item);
	}

	addToGroupCart() {
		// group cart logic here!
	}


	render() {
		return (
			<>
				<ListItem disablePadding>
					<ListItemButton component="a">
						<img className='menu-photo' src={this.props.item.image} alt='food pic' width='200' height='200'></img>
						<div className='menu-item-container'>
							<div className='menu-item-top'>
								<ListItemText
									primary={this.props.item.name}
									secondary={
										<>
											{this.props.item.description}

										</>
									}
								/>
							</div>
							<div className='menu-item-bottom' >
								<ListItemText className='item-price'	primary={'$' + this.props.item.price} />
								<Button className='menu-button' variant="contained" onClick={this.addCurrentItemToCart}>Add to Cart</Button>
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