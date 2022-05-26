import React from 'react';

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
        {this.props.users.map((user) => (
          <div class="payment-each-user">
            <img src={user.photo_url} alt="user" width="100"></img>
            {user.username}
          </div>
        ))}
      </div >
    )
  }
}

export default UserList;
