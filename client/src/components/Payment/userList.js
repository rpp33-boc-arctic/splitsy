import React from 'react';
import { Stack } from '@mui/material';

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div id="payment-user-list">
        USER LIST
        {this.props.users.map((user, i) => (
          <Stack spacing={2} className="payment-each-user" key={i}>
            <img src={user.photo_url} alt="user" width="100"></img>
            {user.username}
          </Stack>
        ))}
      </div >
    )
  }
}

export default UserList;
