import React from 'react';
import { Box, Button, Stack, Switch, Typography } from '@mui/material';
import AuthForm from './Form.js';

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newUser: false,
      formSubmitted: false,
      formData: ''
    };
    this.submitForm = this.submitForm.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
    this.resetFormField = this.resetFormField.bind(this);
  }

  handleSwitch() {
    const { newUser } = this.state;
    this.setState({
      newUser: !newUser
    });
  }

  submitForm(data) {
    const { formSubmitted } = this.state;

    this.setState({
      formSubmitted: !formSubmitted,
      formData: data
    });
  }

  resetFormField() {
    const { formSubmitted } = this.state;

    this.setState({
      formSubmitted: !formSubmitted,
      formData: ''
    });
  }

  render() {

    const { formSubmitted, formData } = this.state;

    return (
      <div className="Auth" style={{ textAlign: 'center', height: '100%' }}>
        <Box sx={{
            position: 'absolute',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            height: '60%',
            width: 500
          }}>
          <Typography sx={{ margin: '70px 45px', fontSize: 64, fontWeight: 700, height: '20%' }}>Splitsy</Typography>
          {
            !formSubmitted
            ?
            <Stack direction="column" spacing={2} alignItems="center" justifyContent="center">
              <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                <Typography sx={{ fontWeight: 700 }}>LOGIN</Typography>
                <Switch checked={this.state.newUser} onChange={this.handleSwitch} inputProps={{ 'aria-label': 'login or signup form display switch' }}/>
                <Typography sx={{ fontWeight: 700 }}>SIGNUP</Typography>
              </Stack>
              <AuthForm registerUser={this.state.newUser} formHandler={this.submitForm}/>
            </Stack>
            :
            <Stack>
              <Box>
                {`You submitted:\n${JSON.stringify(formData)}`}
              </Box>
              <Button onClick={this.resetFormField}>RESET</Button>
            </Stack>
          }
        </Box>
      </div>
    );
  }
}

export default Auth;