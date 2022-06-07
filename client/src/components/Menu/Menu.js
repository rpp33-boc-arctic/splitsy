import React from 'react';
import sampleData from './sampleData.js';
import MenuItemList from './menuItemList.js';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {useLocation} from "react-router-dom";

var Menu = (props)=> {

	console.log(props);
	const {state} = useLocation();
	console.log(window.getCookie('orderSession'))

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

export default Menu;