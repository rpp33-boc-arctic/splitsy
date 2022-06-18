import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BillTemplate from './billTemplate.js';
import Tip from './tip.js';

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
      tipPercent: "",

      subtotal: "",
      tip: 20,
      tipAmount: "",
      tipOptions: {
        15: "outlined",
        20: "contained",
        25: "outlined"
      },
      tax: "",
      total: ""
    }
    this.handleTipBtnClick = this.handleTipBtnClick.bind(this);
    this.renderTipVariant = this.renderTipVariant.bind(this);
    this.handleOtherTip = this.handleOtherTip.bind(this);
  }

  componentDidMount () {
    this.calculateMyBillSummary(() => {this.props.updateMybill(this.state.tipAmount, this.state.total)});

  }

  componentDidUpdate (prevProps, prevState) {
    if (this.props.user_pick !== prevProps.user_pick || prevState.tip !== this.state.tip ) {
      this.calculateMyBillSummary(() => {this.props.updateMybill(this.state.tipAmount, this.state.total)});
    }
  }

  handleTipBtnClick(e) {
    e.preventDefault();
    document.getElementById("payment-tip-input").value = '';
    let tipSelected = e.target.innerText.slice(0, 2);
    this.setState({tip: tipSelected}, this.renderTipVariant(tipSelected));
  }

  handleOtherTip(e) {
    e.preventDefault();
    // console.log('event?', e.target.value);
    let tipSelected = e.target.value;
    this.setState({tip: tipSelected}, this.renderTipVariant(tipSelected));
  }

  renderTipVariant(option) {
    var currentOptions = this.state.tipOptions;
    for (var key in currentOptions) {
      if (key === option) {
        currentOptions[key] = "contained";
      } else {
        currentOptions[key] = "outlined";
      }
    }
    this.setState({tipOptions: currentOptions});
  }

  calculateMyBillSummary (cb = () => {}) {
    var subtotal = 0;
    if (this.props.user_pick.size > 0) {
      this.props.user_pick.forEach((order_item_id) => {
        subtotal += this.props.getPrice(order_item_id);
      })
    }
    var tip = subtotal * this.state.tip/100;
    var tax = subtotal * 0.07;
    var total = subtotal + tip + tax;
    this.setState({
      subtotal: subtotal,
      tipAmount: tip,
      tax: tax,
      total: total
    }, () => {
      cb();
    })
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  render() {
    if (this.props.session.grand_total) {
      return (
        <>
          <Tip
            tip={this.state.tip}
            handleTipBtnClick={this.handleTipBtnClick}
            handleOtherTip={this.handleOtherTip}
            tipOptions={this.state.tipOptions}
          />
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>GROUP BILL SUMMARY</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <BillTemplate
                subtotal={this.props.session.grand_total.toLocaleString('en-US', {maximumFractionDigits:2})}
                tip={(this.props.session.total_tip + this.state.tipAmount).toLocaleString('en-US', {maximumFractionDigits:2})}
                tax={this.props.session.total_tax.toLocaleString('en-US', {maximumFractionDigits:2})}
                total={(this.props.session.total_owed + this.state.tipAmount).toLocaleString('en-US', {maximumFractionDigits:2})} />
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={true}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>MY BILL SUMMARY</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <BillTemplate
                subtotal={this.state.subtotal.toLocaleString('en-US', {maximumFractionDigits:2})}
                tip={this.state.tipAmount.toLocaleString('en-US', {maximumFractionDigits:2})}
                tax={this.state.tax.toLocaleString('en-US', {maximumFractionDigits:2})}
                total={this.state.total.toLocaleString('en-US', {maximumFractionDigits:2})}
              />
            </AccordionDetails>
          </Accordion>
        </>
      )
    } else {
      return <div>Waiting for data</div>
    }

  }
}


export default Bill;