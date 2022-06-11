import React from 'react';

class Summary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.calculateTotalTax = this.calculateTotalTax.bind(this);
    this.calculateGrandTotal = this.calculateGrandTotal.bind(this);
  }

  calculateTotalTax() {
    // total tax logic here
    var grandTotal = this.calculateGrandTotal();
    var totalTax = Math.round((grandTotal * 7.25) / 100);
    return totalTax;
  }

  calculateGrandTotal() {
    // total tax logic here
    var grandTotal = 0;
    for (var i = 0; i < this.props.cart.length; i++) {
      grandTotal += this.props.cart[i].price;
    }
    return grandTotal;
  }

  render() {
    return (
      <div>
        {/* <div>Subtotal:      22.97</div> */}
        {/* <div>Total tax (7.25%):      {this.props.totalTax} </div> */}
        <div>Total tax (7.5%):      {this.calculateTotalTax()}</div>

        {/* <div>Delivery Fee:      22.97</div> */}
        {/* <div>Grand total:      {this.props.grandTotal}  </div> */}
        <div>Subtotal:      {this.calculateGrandTotal()}  </div>
        <div>Grand total:      {this.calculateGrandTotal() + this.calculateTotalTax()}  </div>
        {/* <div>Total owed:      22.97</div> */}
      </div >
    )
  }
}


export default Summary;