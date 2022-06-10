import React from 'react';
import { TextField, Button, Stack } from '@mui/material';


class AuthForm extends React.Component {
  constructor(props: AuthFormProps) {
    super(props);
    this.state = {
      username: '',
      firstname: '',
      lastname: '',
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

    const { username, firstname, lastname, email, password } = this.state;

    if (this.props.registerUser) {

      this.props.formHandler({
        username: username,
        firstname: firstname,
        lastname: lastname,
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
      firstname: '',
      lastname: '',
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
          <>
            <TextField
              label="Username"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
              required
              inputProps={{ 'aria-label': 'authorization form username field' }}
            />
            <TextField
              label="First Name"
              name="firstname"
              value={this.state.firstname}
              onChange={this.handleChange}
              required
              inputProps={{ 'aria-label': 'authorization form firstname field' }}
            />
            <TextField
              label="Last Name"
              name="lastname"
              value={this.state.lastname}
              onChange={this.handleChange}
              required
              inputProps={{ 'aria-label': 'authorization form lastname field' }}
            />
          </>
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
