import React from 'react';
import { Stack, styled, Typography, CircularProgress } from '@mui/material';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

class UserPaidBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paidUsers: [],
      totalUsers: []
    }
    this.getUserStatus = this.getUserStatus.bind(this);
  }

  componentDidMount() {
    this.getUserStatus();
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.props.session !== prevProps.session) {
      this.getUserStatus();
    }
  }

  getUserStatus() {
    let userObj = this.props.session.users;
    if (userObj) {
      let paidUsers = this.state.paidUsers;
      let totalUsers = this.state.totalUsers;
      for(var key in userObj) {
        totalUsers.push(userObj[key]);
        if (userObj[key]['checkout?']) {
          paidUsers.push(userObj[key].user_id)
        }
      }
      this.setState({
        paidUsers: paidUsers,
        totalUsers: totalUsers
      })
    }
  }

  renderPercentage(percentage) {
    if (percentage >= 0) {
      return ( <>{percentage}%</> )
    } else {
      return ( <CircularProgress /> )
    }
  }

  render() {
    const paidPercentage = Math.floor(this.state.paidUsers.length / this.state.totalUsers.length * 100);
    return (
      <div id="user-paid-bar">
        <Stack direction="row" spacing={1}>
          <Typography mb={2} variant="body2">USERS PAID</Typography>
          <br></br>
          <BorderLinearProgress variant="determinate" value={paidPercentage} />
          <Typography mb={2} variant="body2">{this.renderPercentage(paidPercentage)}</Typography>
        </Stack>
      </div >
    )
  }
}


export default UserPaidBar;

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  width: '70%',
  height: 14,
  borderRadius: 7,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    // backgroundColor: '#D9D9D9',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    // backgroundColor: '#605A5A',
  },
}));
