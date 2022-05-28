import React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minutes: 15,
      seconds: 0
    }
  }

  render() {
    const MinSecs = { minutes: this.state.mintues, seconds: this.state.seconds};
    return (
      <div id="payment-timer">
        <CountDownTimer MinSecs={MinSecs}/>
      </div >
    )
  }
}


export default Timer;


const CountDownTimer = ({MinSecs}) => {
  const {minutes = 15, seconds = 0} = MinSecs;
  const [[mins, secs], setTime] = React.useState([minutes, seconds]);

  const tick = () => {
      if (mins === 0 && secs === 0) {
          // reset()
      } else if (secs === 0) {
          setTime([mins - 1, 59]);
      } else {
          setTime([mins, secs - 1]);
      }
  };

  // const reset = () => setTime([parseInt(minutes), parseInt(seconds)]);

  React.useEffect(() => {
      const timerId = setInterval(() => tick(), 1000);
      return () => clearInterval(timerId);
  });

  if (mins === 0 && secs === 0) {
    return (
      <>
        <p>{`${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`}</p>
        <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity="warning">Timeout!</Alert>
        </Stack>
      </>
    );
  } else {
    return (
        <>
          <Button variant="outlined" size="large">
            {`${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`}
          </Button>
        </>
    );
  }
}