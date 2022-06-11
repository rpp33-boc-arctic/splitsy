import React from 'react';
import axios from 'axios';
import { List, ListItem, ListItemAvatar, Avatar, Typography } from '@mui/material';

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUserInfo: []
    }
    this.getUserInfo = this.getUserInfo.bind(this);
    this.renderLoginUser = this.renderLoginUser.bind(this);
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
    if(this.props.session_id) {
      axios.get(`/session${this.props.session_id}/userInfo`)
      .then((users) => {
        this.setState({currentUserInfo: users.data});
        this.props.updateUserMap(users.data);
      })
      .catch((err) => {
        console.log('error in getting user info', err);
      })
    }
  }

  renderLoginUser(currentUserID) {
      if(currentUserID === this.props.user_id) {
        return (<>(Me)</>);
      } else {
        return null;
      }
  }

  render() {
    var userArray = this.state.currentUserInfo.sort((a, b) => {return a.user_id - b.user_id});
      return (
        <div id="payment-user-list">
          <List
            sx={{ width: '100%',
            maxWidth: 240,
            bgcolor: 'background.paper',
            overflow: 'auto',
            maxHeight: '800px'}}
          >
            {userArray.map((user, i) => (
              <ListItem key={i}>
                <ListItemAvatar>
                  <Avatar alt={user.username} src={user.photo_url} sx={{ width: 84, height: 84 }}/>
                  <Typography mb={2}>{user.username} {this.renderLoginUser(user.user_id)}</Typography>
                </ListItemAvatar>
              </ListItem>
            ))}
          </List>
        </div >
      )
    }

}

export default UserList;
