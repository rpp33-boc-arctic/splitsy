import React from 'react';

class Summary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div>
        <div>Subtotal:      22.97</div>
        <div>Tax (10%):      2.97</div>
        <div>Delivery Fee:      22.97</div>
        <div>Total:      22.97</div>
      </div >
    )
  }
}


export default Summary;