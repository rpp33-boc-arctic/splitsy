import React from 'react';
import { Alert, Typography } from '@mui/material';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minutes: 0,
      seconds: 0
    }
  }

  render() {
    const MinSecs = { minutes: this.state.mintues, seconds: this.state.seconds};
    return (
      <div id="payment-timer">
        <CountTimer MinSecs={MinSecs}/>
      </div >
    )
  }
}


export default Timer;


const CountTimer = ({MinSecs}) => {
  const {minutes = 0, seconds = 0} = MinSecs;
  const [[mins, secs], setTime] = React.useState([minutes, seconds]);

  const tick = () => {
      if (mins === 59 && secs === 59) {
        // reset();
      } else if (secs === 59) {
          setTime([mins + 1, 0]);
      } else {
          setTime([mins, secs + 1]);
      }
  };

  // const reset = () => setTime([parseInt(minutes), parseInt(seconds)]);

  React.useEffect(() => {
      const timerId = setInterval(() => tick(), 1000);
      return () => clearInterval(timerId);
  });

  const renderTimerAlert = () => {
    if (mins === 0 ) {
      return <Alert severity="info">Timer starts!</Alert>;
    }
    if (mins % 5 === 0 && mins !== 0) {
      return <Alert severity="warning">{mins} minutes passed!</Alert>;
    }
  }

  return (
    <>
      <Typography mb={1} variant="body1">
        TIMER: {`${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`}
      </Typography>
      {renderTimerAlert()}
    </>
  );
}