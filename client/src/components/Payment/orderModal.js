import * as React from 'react';
import { Box, Modal, Link} from '@mui/material';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const OrderModal = (props) => {
  if (props.ModalOpen === false) {
    return null;
  }

  return (
    <div id="order-modal">
      <Modal
        open={props.ModalOpen}
        onClose={props.ModalClose}
      >
        <Box sx={style}>
          <Typography id="order-modal-title" variant="h6" component="h2">
            WE'VE GOT YOUR ORDER!
          </Typography>
          <Typography id="order-modal-description" sx={{ mt: 2 }}>
            We will submit your order to {props.session.restaurant.name}.
            <br></br>
            Order ID: {props.session.order_id} <br></br>
            Order Total: ${props.session.total_owed + props.session.total_tip}
            <br></br>
            <br></br>
            Thanks for using Splitsy! To learn more, visit Splitsy.com
            by clicking <Link href="https://github.com/rpp33-boc-arctic/splitsy">here</Link>.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default OrderModal;