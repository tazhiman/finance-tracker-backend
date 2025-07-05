import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';

const Accounts: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Bank Accounts
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        Link and manage your bank accounts
      </Typography>
      
      <Paper sx={{ p: 3, mt: 3 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <Typography variant="h6" color="textSecondary">
            Account linking coming soon...
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Accounts; 