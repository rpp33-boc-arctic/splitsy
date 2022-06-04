import React from 'react';
import axios from 'axios';
import Divider from '@mui/material/Divider';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant: 'Restaurant Name',
      items: ['Item'],
      total: 0
    }
    this.history = this.history.bind(this);
  }

  history() {
    axios.get('/user/history') //pass in user_id as param?
      .then((history) => {
        console.log('axios GET /user/history success: ', history)
        // this.setState({
        //   username: user.username
        // })
      })
      .catch((error) => {
        console.log('axios GET /user/history error: ', error);
      })
  }

  compmonentDidMount() {
    this.history();
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
            <Typography>MM/DD/YYYY - Restaurant Name</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {this.props.history.menu_item_name} ${this.props.history.menu_item_price}
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Divider />
      </>
    )
  }
}

export default History;