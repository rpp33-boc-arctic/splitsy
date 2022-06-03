import React from 'react';
import sampleData from './sampleData.js';
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