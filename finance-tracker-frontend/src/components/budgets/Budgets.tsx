import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';

const Budgets: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Budgets
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        Create and manage your budgets
      </Typography>
      
      <Paper sx={{ p: 3, mt: 3 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <Typography variant="h6" color="textSecondary">
            Budget management coming soon...
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Budgets; 