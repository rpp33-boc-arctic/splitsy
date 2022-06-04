import * as React from 'react';
import { Box, Modal} from '@mui/material';
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

const PayModal = (props) => {
  if (props.ModalOpen === false) {
    return null;
  }

  return (
    <div id="pay-modal">
      <Modal
        open={props.ModalOpen}
        onClose={props.ModalClose}
      >
        <Box sx={style}>
          <Typography id="order-modal-title" variant="h6" component="h2">
            Your Payment Total: <b>${props.myTotal}</b>
          </Typography>
          <Typography id="order-modal-description" sx={{ mt: 2 }}>
            REDIRECTING TO PAYMENT...
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default PayModal;