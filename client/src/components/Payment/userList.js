import React from 'react';
import axios from 'axios';
import { List, ListItem, ListItemAvatar, Avatar } from '@mui/material';

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUserInfo: []
    }
    this.getUserInfo = this.getUserInfo.bind(this);
  }

  componentDidMount() {
    this.getUserInfo();
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.props.session_id !== prevProps.session_id) {
      this.getUserInfo();
    }
  }

  getUserInfo() {
    axios.get(`/session${this.props.session_id}/userInfo`)
    .then((users) => {
      this.setState({currentUserInfo: users.data})
    })
    .catch((err) => {
      console.log('error in getting user info', err)
    })
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
            {this.state.currentUserInfo.map((user, i) => (
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
