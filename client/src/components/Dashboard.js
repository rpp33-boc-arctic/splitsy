import React from 'react';
import { Box, Button, Stack, Typography, TextField } from '@mui/material';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <Stack
        direction="column"
        spacing={2}
        alignItems="center"
        justifyContent="center"
        sx={{
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
        }}
      >
        <Box>
          <Button>
            Start a New Order
          </Button>
        </Box>
        <Box>
          <Typography>Join an existing order!</Typography>
          <TextField label="Session Code" name="session-code" />
          <Button>JOIN</Button>
        </Box>
      </Stack>
    )
  }
}

export default Dashboard;