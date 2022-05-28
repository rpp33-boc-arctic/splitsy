import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

class Friend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <>
        <ListItem disablePadding>
          <ListItemButton component="a" href="#simple-list">
            <ListItemText
              primary={this.props.friend.username}
              secondary={
                <>
                  <img src={this.props.friend.photo_url} alt="friendPhoto" width="50"></img> {`@friendUsername`}
                </>
              }
            />
          </ListItemButton>
        </ListItem>
        <Divider/>
      </>
    )
  }
}

export default Friend;