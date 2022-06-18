import * as React from 'react';
import { Box, Modal} from '@mui/material';
import Typography from '@mui/material/Typography';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const style = {
  position: 'absolute',
  top: '15%',
  left: '35%',
  width: 400,
  maxHeight: '70%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflowY: 'scroll',
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
          <Typography id="order-modal-description" sx={{ mt: 2 }} variant="subtitle1">
            PAYMENT METHODS
          </Typography>
          <PayPalScriptProvider options={{ "client-id": "test", components: "buttons", currency: "USD" }}>
            <PayPalButtons
            style={{ layout: "vertical" , overflow: 'scroll'}}
            createOrder={(data, actions) => {
              return actions.order
                .create({
                    purchase_units: [{ amount: { currency_code: "USD", value: 100}}],
                })
                .then((orderId) => {
                    return orderId;
                });
            }}
            onApprove={function (data, actions) {
                return actions.order.capture();
            }}
            />
        </PayPalScriptProvider>
        </Box>
      </Modal>
    </div>
  );
}

export default PayModal;