import React from 'react';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';


class ItemPaid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    if (this.props.item['paid?']) {
      return (
        <div id="item-paid-bar">
          <CircleRoundedIcon></CircleRoundedIcon>
        </div >
        )
      } else {
      return (
        <div id="item-paid-bar">
          <CircleOutlinedIcon></CircleOutlinedIcon>
        </div >
        )
      }
  }
}


export default ItemPaid;