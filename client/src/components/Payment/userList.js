import React from 'react';
// import { Stack } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
      return (
        <div id="payment-user-list">
          <List
            sx={{ width: '100%',
            maxWidth: 240,
            bgcolor: 'background.paper',
            overflow: 'auto',
            maxHeight: 500}}
          >
            {this.props.users.map((user, i) => (
              <ListItem key={i}>
                <ListItemAvatar>
                  <Avatar alt={user.username} src={user.photo_url} sx={{ width: 84, height: 84 }}/>
                  {user.username}
                </ListItemAvatar>
              </ListItem>
            ))}
          </List>
        </div >
      )
    }

}

export default UserList;
