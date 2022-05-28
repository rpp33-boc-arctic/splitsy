import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

class Tip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tip: 20
    }
  }

  render() {
    return (
      <div id="payment-user-tip">
        ADD USER TIPS
        <br></br>
        <br></br>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" size="large">15%</Button>
          <Button variant="contained" size="large">20%</Button>
          <Button variant="outlined" size="large">25%</Button>
        </Stack>
        <Stack width="75%">
          <TextField
            id="payment-tip-input"
            label="Other(%)"
            variant="filled"
            margin="normal"
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