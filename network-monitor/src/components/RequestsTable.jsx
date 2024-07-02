import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Collapse, Box } from '@mui/material';

const RequestsTable = ({ requests }) => {
  const [expandedRequest, setExpandedRequest] = useState(null);

  const handleRowClick = (req) => {
    if (expandedRequest === req) {
      setExpandedRequest(null);
    } else {
      setExpandedRequest(req);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>URL</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Initiator</TableCell>
            <TableCell>Size</TableCell>
            <TableCell>Time (ms)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requests.map((req, index) => (
            <React.Fragment key={index}>
              <TableRow onClick={() => handleRowClick(req)} style={{ cursor: 'pointer' }}>
                <TableCell>{req.url}</TableCell>
                <TableCell>{req.status}</TableCell>
                <TableCell>{req.method}</TableCell>
                <TableCell>{req.headers ? req.headers['referer'] : 'N/A'}</TableCell>
                <TableCell>{req.data ? `${(JSON.stringify(req.data).length / 1024).toFixed(2)} KB` : 'N/A'}</TableCell>
                <TableCell>{req.duration}</TableCell>
              </TableRow>
              {expandedRequest === req && (
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={expandedRequest === req} timeout="auto" unmountOnExit>
                      <Box margin={1}>
                        <Typography variant="h6" gutterBottom component="div">
                          Details
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          Headers:
                          <pre>{JSON.stringify(req.headers, null, 2)}</pre>
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          Payload:
                          <pre>{JSON.stringify(req.data, null, 2)}</pre>
                        </Typography>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RequestsTable;
