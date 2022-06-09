import React from 'react';
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
            <Typography>{this.props.history.date} - {this.props.history.restaurant}</Typography>

          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {this.props.history.items.map((item) => {
                return <Typography>{item.name} ${item.price}</Typography>
              })}<br></br>
              Tip: ${this.props.history.tip} <br></br>
              Total: ${this.props.history.total} <br></br>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Divider />
      </>
    )
  }
}

export default History;