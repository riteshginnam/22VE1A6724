import React, { useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import URLForm from './components/URLForm';

const ShortenerPage = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          URL Shortener
        </Typography>
        <URLForm />
      </Box>
    </Container>
  );
};

export default ShortenerPage;
