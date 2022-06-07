import React from 'react';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemText from '@mui/material/ListItemText';
// import { List } from '@mui/material';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';


class Friend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <>
        {/* <ListItem disablePadding>
          <ListItemButton component="a" href="#simple-list">
            <ListItemText
              primary={this.props.friend.username}
              secondary={
                <>
                  <img src={this.props.friend.photo_url} alt="friendPhoto" width="50"></img> {`@friendUsername`}
                </>
              }
            />
          </ListItemButton>
        </ListItem> */}
        <Grid container spacing={4}>
          <Grid item xs={3}>
            <br></br>
            <img src={this.props.friend.photo_url} alt="friendPhoto" width="50"></img>
            {/* <ListItem disablePadding>
              <ListItemButton>
                <ListItemText
                  primary={
                    <>
                      <img src={this.props.friend.photo_url} alt="friendPhoto" width="50"></img>
                    </>
                  }
                />
              </ListItemButton>
            </ListItem> */}
          </Grid>
          <Grid item xs={8}>
            <br></br>
            <Typography>My Friend</Typography>
            <Typography>@{this.props.friend.username}</Typography><br></br>
            {/* <ListItem disablePadding>
              <ListItemButton>
                <ListItemText
                  primary={this.props.friend.username}
                  secondary={
                    <>
                      {`@friendUsername`}
                    </>
                  }
                />
              </ListItemButton>
            </ListItem> */}
          </Grid>
        </Grid>
        <Divider />
      </>
    )
  }
}

export default Friend;