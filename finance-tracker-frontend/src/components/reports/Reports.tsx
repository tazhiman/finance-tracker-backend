import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';

const Reports: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Reports
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        View financial reports and analytics
      </Typography>
      
      <Paper sx={{ p: 3, mt: 3 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <Typography variant="h6" color="textSecondary">
            Financial reporting coming soon...
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Reports; 