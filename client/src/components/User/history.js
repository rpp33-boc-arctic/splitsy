import React from 'react';
// import axios from 'axios';
import Divider from '@mui/material/Divider';
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
            <Typography>05/28/2022 - {this.props.history.restaurant}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {this.props.history.items.map((item) => {
                return <Typography>{item.name} ${item.price}</Typography>
              })}<br></br>
              Tip: ${this.props.history.tip} <br></br>
              Total: ${this.props.history.total}
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Divider />
      </>
    )
  }
}

export default History;