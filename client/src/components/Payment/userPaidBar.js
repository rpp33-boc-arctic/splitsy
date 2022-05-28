import React from 'react';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

class UserPaidBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paidUsers: [1, 2, 4],
      totalUsers:[1, 2, 3, 4, 5]
    }
  }

  render() {
    const paidPercentage = Math.floor(this.state.paidUsers.length / this.state.totalUsers.length * 100);
    return (
      <div id="user-paid-bar">
        <Stack direction="row" spacing={1}>
          USERS PAID
          <br></br>
          <BorderLinearProgress variant="determinate" value={paidPercentage} />
          {paidPercentage}%
        </Stack>
      </div >
    )
  }
}


export default UserPaidBar;

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  width: '80%',
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
