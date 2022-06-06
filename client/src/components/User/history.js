import React from 'react';
import axios from 'axios';
import Divider from '@mui/material/Divider';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: 10,
      restaurant: 'Restaurant Name',
      items: ['Item 1', 'Item 2'],
      total: 0
    }
    this.history = this.history.bind(this);
  }

  history() {
    axios.get(`/user/history${this.state.user_id}`) //pass in user_id as param?
      .then((success) => {
        console.log('axios GET /user/history success: ', success)
        // this.setState({
        //   restaurant: success.data[0],
        //   items: [],
        //   total: 0
        // })
      })
      .catch((error) => {
        console.log('axios GET /user/history error: ', error);
      })
  }

  componentDidMount() {
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
            <Typography>MM/DD/YYYY - {this.state.restaurant}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {/* {this.props.history.menu_item_name} ${this.props.history.menu_item_price} */}
              {this.state.items} ${this.state.total}
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Divider />
      </>
    )
  }
}

export default History;