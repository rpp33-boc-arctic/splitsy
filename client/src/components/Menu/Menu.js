// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
// import sampleData from './sampleData.js';
// import MenuItemList from './menuItemList.js';
// import Button from '@mui/material/Button';
import FullMenu from './fullMenu.js';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {useLocation} from "react-router-dom";
import menuStyles from './menuStyles.css';

var Menu = (props)=> {
	const {state} = useLocation();
	// console.log('useLocation data is, state.item: ', state.item);
	// eslint-disable-next-line no-unused-vars
	const [fullMenu, setFullMenu] = useState(state);

//   useEffect(() => {
// 		const data = localStorage.getItem('fullMenu');
// 		console.log('fullMenu is: ', fullMenu);

// 		if (data){
// 			setFullMenu(JSON.parse(data));
// 		}
// }, [fullMenu]);

// useEffect(() => {
// 	// setCart(JSON.parse(localStorage.setItem('cart', cart)))
// 	localStorage.setItem('fullMenu', JSON.stringify(fullMenu));
// });

		return (
			<div className='menu'>
				<div className='title-container'>
					<h1>{fullMenu.item.name}</h1>
					<h2>Address: {fullMenu.item.address.street_addr}</h2>
					<h2>Phone Number: {fullMenu.item.phone_number}</h2>

					{/* <Button variant="contained" endIcon={<ShoppingCartIcon fontSize="large" />}>
        <Link to="/Cart" style={{'textDecoration': 'none', color: 'white'}}>
          GO TO CART
        </Link>
      </Button> */}

				</div>
				<div className='menu-title'>
					<h2>Full Menu</h2>
				</div>
				{/* <div className='menu-item-list'><MenuItemList /></div> */}
								<div className='menu-item-list'><FullMenu fullMenu={fullMenu.item} /></div>
			</div >
		)
}

export default Menu;