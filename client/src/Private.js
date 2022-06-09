import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';


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

    if (!this.props.user.username || !this.props.user.userId) {

      return (<Navigate to="/" replace />);
    }

    return (
      <div>
        <Outlet />
      </div>
    );
  }
};

export default Private;
