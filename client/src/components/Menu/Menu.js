import React from 'react';
import sampleData from './sampleData.js';
import $ from 'jquery';
// import MenuItemList from './menuItemList.js';
import Submenu from './submenu.js';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


class Menu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			restaurant_id: '42dc41b7-82bb-475d-a296-98adfab5899f',
			restaurant_name: ''
		}
	}


	getMenu() {
		var link = '/menu';
		$.ajax({
			method: "GET",
			url: link,
			// contentType: 'text/plain',
			data: {restaurant_id: this.state.restaurant_id},
			success: (response) => {
				if (response === 'GET request received!') {
					console.log('GET request success!');
				}

			},
			error: (err) => {
				console.log('Error: ', err);
			}
		})
		.done(function() {
			console.log("getMenu is done!");
		});
		console.log("ready!");
	}

	render() {
		return (
			<div className='menu'>
				<div className='menu-title-container'>
					<h1>{sampleData.name}</h1>
					<ShoppingCartIcon fontSize="large" />
				</div>
				<div className='menu-title'>
					<h2>Menu</h2>
				</div>
				<div className='menu-item-list'><Submenu /></div>
			</div >
		)
	}
}

export default Menu;


// Need to know which restaurant, perhaps restaurant id, which should be from Grant?
// Need to