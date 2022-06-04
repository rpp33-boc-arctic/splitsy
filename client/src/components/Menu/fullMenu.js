import React, { useState } from 'react';
import SubmenuItem from './menuItem.js';
import SubmenuItemList from './submenuItemList.js';
import { List, Button } from '@mui/material';
import sampleData from './sampleData.js';
import menuStyles from './menuStyles.css';
import Cart from '../Cart/Cart.js';
import { Link } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


class FullMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollerStyle: {
        overflowY: 'scroll',
				// overflowY: 'hidden',
        border:'1px solid grey',
        width:'1300px',
        float: 'left',
        height:'800px',
        // position:'relative'
      },
			cart: [],
			hideCart: false
			// showComponent: false
    }
		// this.onMenuCardClick = this.onMenuCardClick.bind(this);
				this.addToCart = this.addToCart.bind(this);
				this.emptyCart = this.emptyCart.bind(this);
				this.updateCart = this.updateCart.bind(this);

  }

	addToCart(currentItem) {
		console.log('add to cart logic here!');

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

		var current_cart = this.state.cart;
		current_cart.push(currentItem);
		this.setState({
			cart: current_cart
		}, () => {console.log('cart state is now: ', this.state.cart)})
	}

	emptyCart() {
		//empty cart logic here
		this.setState({
			cart: []
		})

	}

	updateCart() {
		return <Cart cart={this.state.cart}/>
	}

  render() {
    var items = this.props.fullMenu.menu.categories.map((item, i) => {
      return <div>
						{/* <submenuItemList submenu={item} key={i} />
						<p>{item.name}</p> */}
						{
						<SubmenuItemList submenu={item} key={i} addToCart={this.addToCart} emptyCart={this.emptyCart} />
						}
			</div>
    })
		// console.log('menuStyles: ', menuStyles.toString().slice(0,1));
		// console.log('this.props.fullMenu is: ', this.props.fullMenu);
		console.log('cart inside fullMenu is now: ', this.state.cart);

    return (

      <div>
					<Button variant="contained" endIcon={<ShoppingCartIcon fontSize="large" class='go-to-cart'/>} >
        <Link to="/Cart" style={{'textDecoration': 'none', color: 'white'}} params={{ testvalue: "hello" }} >
          GO TO CART
        </Link>

      </Button>

			<Button variant="contained" endIcon={<ShoppingCartIcon fontSize="large" class='go-to-cart'/>} onClick={this.emptyCart}>
        EMPTY CART
      </Button>

        <List className='example' style={this.state.scrollerStyle} >
        {items}
      </List>
				{
					this.state.hideCart?
					<Cart cart={this.state.cart} />:
					null

				}
      </div>

    )
  }
}


export default FullMenu;