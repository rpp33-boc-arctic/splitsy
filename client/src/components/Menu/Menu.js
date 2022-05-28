import React from 'react';
import sampleData from './sampleData.js';
import MenuItemList from './menuItemList.js';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


class Menu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}

	render() {
		return (
			<div className='menu'>
				<div className='title-container'>
					<h1>{sampleData.name}</h1>
					<ShoppingCartIcon fontSize="large" />
				</div>
				<div className='menu-title'>
					<h2>Menu</h2>
				</div>
				<div className='menu-item-list'><MenuItemList /></div>
			</div >



		)
	}
}

export default Menu;