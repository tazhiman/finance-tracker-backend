import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';

const Transactions: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Transactions
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        Manage your financial transactions
      </Typography>
      
      <Paper sx={{ p: 3, mt: 3 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <Typography variant="h6" color="textSecondary">
            Transaction management coming soon...
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Transactions; 