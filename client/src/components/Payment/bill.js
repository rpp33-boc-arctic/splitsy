import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BillTemplate from './billTemplate.js';

// props.session.total_tip,
            // total_tax,
            // total_paid,
            // grand_total }
// props.getPrice = function
// props.user_pick = [order_item_id]

class Bill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "group", //groupBill, myBill, usernameBill (stretch)
      tipPercent: "",

      subtotal: "",
      tip: "",
      tax: "",
      total: ""
    }
  }

  componentDidMount () {
    this.calculateMyBillSummary()
  }

  componentDidUpdate () {
    this.calculateMyBillSummary()
  }

  calculateMyBillSummary () {
    // var subtotal = 0
    // iterate over user_pick
      // subtotal+= getPrice(order_item_id)
    // var tip = subtotal * this.state.tipPercent/100
    // var tax = subtotal * 0.07
    // var total = subtotal + tip + tax
    // setState tip, tax, subtotal, total
  }

  render() {
    return (
      <>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>GROUP BILL SUMMARY</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <BillTemplate
              subtotal={this.props.session.grand_total}
              tip={this.props.session.total_tip}
              tax={this.props.session.total_tax}
              total={this.props.session.total_owed} />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>MY BILL SUMMARY</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <BillTemplate
              subtotal={this.state.subtotal}
              tip={this.state.tip}
              tax={this.state.tax}
              total={this.state.total} />
            />
          </AccordionDetails>
        </Accordion>
      </>
    )
  }
}


export default Bill;