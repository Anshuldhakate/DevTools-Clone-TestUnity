import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const RequestDetails = ({ open, onClose, request }) => {
  if (!request) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Request Details</DialogTitle>
      <DialogContent>
        <Typography>URL: {request.url}</Typography>
        <Typography>Method: {request.method}</Typography>
        <Typography>Status: {request.status}</Typography>
        <Typography>Duration: {request.duration} ms</Typography>
        <Typography>Headers: {JSON.stringify(request.headers)}</Typography>
        <Typography>Data: {JSON.stringify(request.data)}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RequestDetails;
