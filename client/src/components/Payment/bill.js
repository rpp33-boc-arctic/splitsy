import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BillTemplate from './billTemplate.js';

// session.total_tip,
          // total_tax,
          // total_paid,
          // grand_total }

class Bill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "group", //groupBill, myBill, usernameBill (stretch)
    }
  }

  getSubTotal(arrayOfItemNumber) {

  }

  render() {
    // var user_id =
    // var receipt = this.props.session.receipt;
    // var mySubTotal = getSubTotal(receipt.user_id.items);
    // var myTip = receipt.user_tip;
    // var myTax = mySubTotal*0.07;
    // var myTotal = mySubTotal + myTip + myTax;

    return (
      <>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>GROUP BILL SUMMARY</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <BillTemplate
              subtotal={this.props.session.grand_total.toLocaleString(undefined, {maximumFractionDigits:2})}
              tip={this.props.session.total_tip.toLocaleString(undefined, {maximumFractionDigits:2})}
              tax={this.props.session.total_tax.toLocaleString(undefined, {maximumFractionDigits:2})}
              total={this.props.session.total_owed.toLocaleString(undefined, {maximumFractionDigits:2})} />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>MY BILL SUMMARY</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <BillTemplate
              // subtotal={this.props.session.grand_total.toLocaleString(undefined, {maximumFractionDigits:2})}
              // tip={this.props.session.total_tip.toLocaleString(undefined, {maximumFractionDigits:2})}
              // tax={this.props.session.total_tax.toLocaleString(undefined, {maximumFractionDigits:2})}
              // total={this.props.session.total_owed.toLocaleString(undefined, {maximumFractionDigits:2})} />
            />
          </AccordionDetails>
        </Accordion>
      </>
    )
  }
}


export default Bill;