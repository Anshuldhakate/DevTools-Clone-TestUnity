import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, ToggleButton, ToggleButtonGroup, Typography, Container } from '@mui/material';
import RequestsTable from './RequestsTable';

const NetworkRequests = () => {
  const [url, setUrl] = useState('');
  const [filter, setFilter] = useState(['All']); // Initialize filter as an array
  const [requests, setRequests] = useState([]);

  const handleSearch = () => {
    if (!url) return;

    let formattedUrl = url;
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = `https://${formattedUrl}`;
    }

    const startTime = new Date().getTime();

    axios.get(`http://localhost:5000/proxy?url=${encodeURIComponent(formattedUrl)}`)
      .then(response => {
        const endTime = new Date().getTime();
        const duration = endTime - startTime;

        setRequests(prevRequests => [
          ...prevRequests,
          {
            url: response.config.url,
            method: response.config.method,
            status: response.status,
            statusText: response.statusText,
            duration: duration,
            headers: response.config.headers,
            data: response.data,
          }
        ]);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const filteredRequests = requests.filter(req => {
    if (filter.includes('All')) return true; // Check if 'All' is included in filter
    return filter.some(f => req.url.includes(f.toLowerCase())); // Check if any filter matches
  });

  const handleFilterChange = (event, newFilters) => {
    if (newFilters !== null) {
      setFilter(newFilters); // Update filter state with newFilters array
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Network Requests</Typography>
      <TextField
        label="Enter URL"
        variant="outlined"
        fullWidth
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        margin="dense"
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>Search</Button>
      <ToggleButtonGroup
        value={filter}
        onChange={handleFilterChange}
        aria-label="Filter by"
        style={{ marginTop: '10px' }}
      >
        <ToggleButton value="All">All</ToggleButton>
        <ToggleButton value="Doc">Doc</ToggleButton>
        <ToggleButton value="XHR">XHR</ToggleButton>
        <ToggleButton value="JS">JS</ToggleButton>
        <ToggleButton value="CSS">CSS</ToggleButton>
        <ToggleButton value="Font">Font</ToggleButton>
        <ToggleButton value="Img">Img</ToggleButton>
        <ToggleButton value="Media">Media</ToggleButton>
        <ToggleButton value="Manifest">Manifest</ToggleButton>
        <ToggleButton value="WS">WS</ToggleButton>
        <ToggleButton value="Wasm">Wasm</ToggleButton>
      </ToggleButtonGroup>
      <RequestsTable requests={filteredRequests} />
    </Container>
  );
};

export default NetworkRequests;
