import React from 'react';
import { Stack, Button, TextField, Typography } from '@mui/material';

class Tip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tip: this.props.tip,
      tipOptions: {
        15: "outlined",
        20: "contained",
        25: "outlined"
      }
    }
  }


  render() {
    return (
      <div id="payment-user-tip">
        <Typography mb={1}>ADD USER TIPS</Typography>
        <Stack direction="row" spacing={2}>
          <Button variant={this.props.tipOptions[15]} size="large" onClick={this.props.handleTipBtnClick}>15%</Button>
          <Button variant={this.props.tipOptions[20]} size="large" onClick={this.props.handleTipBtnClick}>20%</Button>
          <Button variant={this.props.tipOptions[25]} size="large" onClick={this.props.handleTipBtnClick}>25%</Button>
        </Stack>
        <Stack width="90%">
          <TextField
            id="payment-tip-input"
            label="Other(%)"
            variant="filled"
            margin="normal"
            onChange={this.props.handleOtherTip}
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