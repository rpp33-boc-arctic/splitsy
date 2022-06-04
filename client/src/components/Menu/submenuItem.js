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
			quantity: 0,
			add_to_cart: []
		}
		this.addToCart = this.addToCart.bind(this);
	}

	addToCart() {
		console.log('add to cart logic here!');
		// this.setState({
		// 	quantity: 1
		// })
	}


	render() {
		console.log('item is: ', this.props.item);
		console.log('add to cart right now is: ', this.state.add_to_cart);
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
								<Button className='menu-button' variant="contained" onClick={this.addToCart}>Add to Cart</Button>
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