import React, { useState } from 'react';
import {
  Box, TextField, Button, Grid, Typography, Paper
} from '@mui/material';
import loggerMiddleware from '../loggerMiddleware';

const URLForm = () => {
  const [entries, setEntries] = useState([{ url: '', validity: '', shortcode: '' }]);
  const [shortenedLinks, setShortenedLinks] = useState([]);

  const handleChange = (index, field, value) => {
    const updated = [...entries];
    updated[index][field] = value;
    setEntries(updated);
  };

  const validateURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const generateShortcode = () => Math.random().toString(36).substring(2, 8);

  const handleSubmit = () => {
    const result = [];
    entries.forEach((entry, idx) => {
      const { url, validity, shortcode } = entry;

      if (!validateURL(url)) {
        alert(`Invalid URL at row ${idx + 1}`);
        return;
      }

      const code = shortcode || generateShortcode();
      const expiry = new Date(Date.now() + ((validity ? parseInt(validity) : 30) * 60000));

      const shortUrl = `http://localhost:3000/${code}`;
      const item = {
        shortUrl,
        originalUrl: url,
        expiry: expiry.toLocaleString()
      };

      loggerMiddleware.log('URL Shortened', item);
      result.push(item);
    });

    setShortenedLinks(result);
  };

  return (
    <Box>
      {entries.map((entry, index) => (
        <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <TextField
              label="Original URL"
              fullWidth
              value={entry.url}
              onChange={(e) => handleChange(index, 'url', e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              label="Validity (min)"
              type="number"
              fullWidth
              value={entry.validity}
              onChange={(e) => handleChange(index, 'validity', e.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              label="Custom Code"
              fullWidth
              value={entry.shortcode}
              onChange={(e) => handleChange(index, 'shortcode', e.target.value)}
            />
          </Grid>
        </Grid>
      ))}
      {entries.length < 5 && (
        <Button onClick={() => setEntries([...entries, { url: '', validity: '', shortcode: '' }])}>
          Add Another
        </Button>
      )}
      <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
        Shorten URLs
      </Button>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Shortened Links</Typography>
        {shortenedLinks.map((link, idx) => (
          <Paper key={idx} sx={{ p: 2, mt: 2 }}>
            <Typography>Original: {link.originalUrl}</Typography>
            <Typography>Short: {link.shortUrl}</Typography>
            <Typography>Expires: {link.expiry}</Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default URLForm;