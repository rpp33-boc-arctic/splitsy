import React from 'react';
import FullMenu from './fullMenu.js';
import {useLocation} from "react-router-dom";

var Menu = (props)=> {
	const {state} = useLocation();

	var displayPhoneNum = (num) => {
		var strNum = JSON.stringify(num);
		var phoneNum = `${strNum.slice(0, 1)} (${strNum.slice(1, 4)}) ${strNum.slice(4, 7)}-${strNum.slice(7, 11)}`;
		return phoneNum;
	}

	var fullMenu =  JSON.parse(localStorage.getItem('fullMenu')) ?  JSON.parse(localStorage.getItem('fullMenu')): state;

	return (
		<div className='menu'>
			<div className='title-container'>
				<h1>{fullMenu.item.name}</h1>
				<h2>Address: {fullMenu.item.address.street_addr}</h2>
				<h2>Phone Number: {displayPhoneNum(fullMenu.item.phone_number)}</h2>
			</div>
			<div className='menu-title'>
				<h2>Full Menu</h2>
			</div>
			<div className='menu-item-list'><FullMenu fullMenu={fullMenu.item} /></div>
		</div >
	)
}

export default Menu;