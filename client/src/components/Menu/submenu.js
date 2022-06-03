import React from 'react';
import sampleData from './sampleData.js';
import MenuItemList from './menuItemList.js';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


class Submenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}

	render() {
		return (
			<div className='submenu'>
				<div className='subemenu-title-container'>
					<h1>{sampleData.name}</h1>
					<ShoppingCartIcon fontSize="large" />
				</div>
				<div className='submenu-title'>
					<h2>Menu</h2>
				</div>
				<div className='submenu-item-list'><MenuItemList /></div>
			</div >



		)
	}
}

export default Submenu;