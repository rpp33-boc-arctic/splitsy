import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

class Tip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tip: 20,
      tipOptions: {
        15: "outlined",
        20: "contained",
        25: "outlined"
      }
    }
    this.handleTipBtnClick = this.handleTipBtnClick.bind(this);
    this.renderTipVariant = this.renderTipVariant.bind(this);
    this.handleOtherTip = this.handleOtherTip.bind(this);
  }

  handleTipBtnClick(e) {
    e.preventDefault();
    let tipSelected = e.target.innerText.slice(0, 2);
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

  handleOtherTip(e) {
    e.preventDefault();
    // console.log('event?', e.target.value);
    let tipSelected = e.target.value;
    this.setState({tip: tipSelected}, this.renderTipVariant(tipSelected));
  }

  render() {
    return (
      <div id="payment-user-tip">
        ADD USER TIPS
        <br></br>
        <br></br>
        <Stack direction="row" spacing={2}>
          <Button variant={this.state.tipOptions[15]} size="large" onClick={this.handleTipBtnClick}>15%</Button>
          <Button variant={this.state.tipOptions[20]} size="large" onClick={this.handleTipBtnClick}>20%</Button>
          <Button variant={this.state.tipOptions[25]} size="large" onClick={this.handleTipBtnClick}>25%</Button>
        </Stack>
        <Stack width="90%">
          <TextField
            id="payment-tip-input"
            label="Other(%)"
            variant="filled"
            margin="normal"
            onChange={this.handleOtherTip}
            helperText="Enter Tip Percentage"
          />
        </Stack>
        <br></br>
        <br></br>
        <br></br>
      </div >
    )
  }
}


export default Tip;