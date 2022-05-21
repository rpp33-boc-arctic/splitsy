import React from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.serverStatus = this.serverStatus.bind(this);
  }

  serverStatus() {
    $.ajax({
      context: this,
      type: 'GET',
      url: '/serverStatus',
      contentType: 'application/json',
      success: function (success) {
        console.log('Server Connection Success!');
        this.setState({
          serverConnected: true
        })
      },
      error: function (error) {
        console.log('Server Connection Error!');
        this.setState({
          serverConnected: false
        })
      },
    })
  }

  componentDidMount() {
    this.serverStatus();
  }

  render() {
    return (
      <div>
        <h1 id="title">Splitsy</h1>
        © 2022 Splitsy Inc. All rights reserved.
      </div>
    )
  }
}

ReactDom.render(<App />, document.getElementById('app'));