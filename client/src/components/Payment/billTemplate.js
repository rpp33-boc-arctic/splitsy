import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// props.total_tip,
          // total_tax,
          // total_paid,
          // grand_total }

var billTemplate = (props) => (
  <TableContainer component={Paper}>
    <Table  >
      <TableBody>
          <TableRow>
            <TableCell >SUB-TOTAL</TableCell>
            <TableCell >{props.subtotal}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell >TIP (%)</TableCell>
            <TableCell >{props.tip}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell >TAX</TableCell>
            <TableCell >{props.tax}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell >TOTAL</TableCell>
            <TableCell >{props.total}</TableCell>
          </TableRow>
      </TableBody>
    </Table>
  </TableContainer>
)


export default billTemplate;