import React from 'react';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{this.props.history.date} - {this.props.history.restaurant}</Typography>

          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={1} id="history-page">
              <Grid item xs={2}>
              </Grid>
              <Grid item xs={7}>
                {this.props.history.items.map((item) => {
                  return <Typography>{item.name}</Typography>
                })}
              </Grid>
              <Grid item xs={3}>
                {this.props.history.items.map((item) => {
                  return <Typography>${item.price}</Typography>
                })}
              </Grid>
              <Grid item xs={2}>
              </Grid>
              <Grid item xs={7}>
                <Typography>
                  Tip <br></br>
                  Total <br></br>
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography>
                  ${this.props.history.tip} <br></br>
                  ${this.props.history.total} <br></br>
                </Typography>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
        <Divider />
      </>
    )
  }
}

export default History;