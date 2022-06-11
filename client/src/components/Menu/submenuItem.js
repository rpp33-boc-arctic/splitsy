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
		console.log('add to cart logic here! And this.props.item is: ', this.props.item);

		// var cartItem = {
		// 	item: this.props.item,
		// 	count: 1
		// }
		// var current_cart = this.state.add_to_cart;
		// current_cart.push(cartItem);
		// this.setState({
		// 	add_to_cart: current_cart
		// });
		// console.log('current_cart is: ', current_cart);
		// return <Cart cart={current_cart} />


		// var currentItem = this.props.item;
		// this.props.addToCart(currentItem);
		// console.log('item added to cart!');

		// <Cart item={this.props.item} />


		var item = this.props.item;
		// var item = 'hi';
		this.props.addToCart(item);



	}

	addToGroupCart() {
		// group cart logic here!

	}


	render() {
		console.log('props inside submenuItem is: ', this.props);
		// console.log('add to cart right now is: ', this.state.add_to_cart);
		return (
			<>
				<ListItem disablePadding>
					{/* <ListItemButton component="a" href="#simple-list"> */}
					<ListItemButton component="a">

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