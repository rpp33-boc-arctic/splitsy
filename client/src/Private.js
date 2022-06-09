import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

//Props:
//this.props.user.username
//this.props.user.userId

class Private extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidUpdate (prevProps) {
    if (prevProps.user.username !==  this.props.user.username) {
      this.render();
    }
  }

  render () {
    console.log('props', this.props)

    if (!this.props.user.username || !this.props.user.userId) {
      console.log('no')
      // document.location.href = "/" // this works but refresh cookie
      return (<Navigate to="/" replace />)
    }
    console.log('yes')
    return (
      <div>
        <Outlet />
      </div>
    );
  }
};

export default Private;