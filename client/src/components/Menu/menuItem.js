import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
// import ListItemIcon from '@mui/material/ListItemIcon';
import { Divider, Typography } from '@mui/material';

class MenuItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}
	render() {
		return (
			<>
				<ListItem disablePadding secondaryAction={
					<Typography variant='h1' component='h2'>h1. Heading</Typography>
				}>
					<ListItemButton component="a" href="#simple-list">
						<img className='menu-photo' src={this.props.item.image} alt='food pic' width='200' height='200'></img>
						<div className='menu-item-container'>
							<div className='menu-item-top'>
								<ListItemText
									primary={this.props.item.name}
									secondary={
										<>
											{this.props.item.description}

										</>
									}
								/>
							</div>
							<div className='menu-item-bottom' >
								<ListItemText className='item-price'	primary={'$' + this.props.item.price} />
								<Button className='menu-button' variant="contained">Add to Cart</Button>
							</div>
						</div>



					</ListItemButton>
				</ListItem>
				<Divider className='menu-divider'/>
			</>
		)
	}
}


export default MenuItem;