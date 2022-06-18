import React, { useState, useEffect } from 'react';
import SubmenuItemList from './submenuItemList.js';
import { List, Button } from '@mui/material';
import { Link } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';

import {useLocation} from "react-router-dom";

function FullMenu(props) {

	const [scrollerStyle] = useState(
		{
			overflowY: 'scroll',
			border: '1px solid grey',
			width: '1300px',
			float: 'left',
			height: '800px',
		}
	);
	const [cart, setCart] = useState([]);

	function addToCart(currentItem) {
		setCart([...cart, currentItem]);
		console.log('cart to add',cart  )
	}

	useEffect(() => {
		localStorage.clear();
		localStorage.setItem('cart', JSON.stringify(cart));
	}, [cart])

	function emptyCart() {
		setCart([]);
	}

	function renderMenu() {
		var items = props.fullMenu.menu.categories.map((item, i) => {
			return <div key={i}>
				{
					<SubmenuItemList submenu={item} addToCart={addToCart} emptyCart={emptyCart} />
				}
			</div>
		})
		return items;
	}

	function itemCount() {
		var count = cart.length;
		return count;
	}

	const {state} = useLocation();
	const [fullMenu] = useState(state);

  var handleClickCheckOut = () => {
    localStorage.setItem('fullMenu', JSON.stringify(fullMenu));
  }

	return (

		<div className='full-menu'>
			<Stack spacing={2} direction="row">
			</Stack>
			<div className='menu-buttons' >
				<Button xs={2} className='go-to-cart' variant="contained" onClick={handleClickCheckOut} endIcon={
					<Badge badgeContent={itemCount()} color="secondary">
						<ShoppingCartIcon color="action" />
					</Badge>
				}>
					<Link to="/protected/Cart" style={{ 'textDecoration': 'none', color: 'white' }} params={{ testvalue: "hello" }} state={cart} >
						GO TO CART
					</Link>
				</Button  >

				<Button className='empty-cart' variant="contained" endIcon={<ShoppingCartIcon fontSize="large" />} onClick={emptyCart} xs={2} >
					EMPTY CART
				</Button>
				<br></br>
				<List className='example' xs={8} style={scrollerStyle} >
					{renderMenu()}
				</List>
			</div>

		</div>

	)
}


export default FullMenu;