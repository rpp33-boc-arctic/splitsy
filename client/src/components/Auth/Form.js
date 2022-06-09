import React from 'react';
import { TextField, Button, Stack } from '@mui/material';


class AuthForm extends React.Component {
  constructor(props: AuthFormProps) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  }

  submitForm(e) {
    e.preventDefault();

    const { username, email, password } = this.state;

    if (this.props.registerUser) {

      this.props.formHandler({
        username: username,
        email: email,
        password: password
      });

    } else {

      this.props.formHandler({
        email: email,
        password: password
      });

    }

    this.setState({
      username: '',
      email: '',
      password: ''
    });
  }


  render () {
    const { registerUser } = this.props;

    return (
      <Stack direction="column" spacing={2} alignItems="center" justifyContent="center">
        {
          registerUser
          &&
          <TextField
            label="Username"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
            required
            inputProps={{ 'aria-label': 'authorization form name field' }}
          />
        }
        <TextField
          label="Email"
          name="email"
          type="email"
          value={this.state.email}
          onChange={this.handleChange}
          required
          inputProps={{ 'aria-label': 'authorization form email field' }}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={this.state.password}
          onChange={this.handleChange}
          required
          inputProps={{ 'aria-label': 'authorization form password field' }}
        />
        <Button variant="contained" onClick={this.submitForm}>{registerUser ? 'signup' : 'login'}</Button>
      </Stack>
    );
  }
}

export default AuthForm;
