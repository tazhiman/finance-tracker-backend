import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  AccountBalance,
  Receipt,
  Warning,
  CheckCircle,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  // Mock data - in a real app, this would come from API calls
  const mockData = {
    totalBalance: 15420.50,
    monthlyIncome: 3200.00,
    monthlyExpenses: 1850.75,
    savings: 1250.25,
    recentTransactions: [
      { id: 1, description: 'Grocery Shopping', amount: -85.50, type: 'EXPENSE', date: '2024-01-15' },
      { id: 2, description: 'Salary Deposit', amount: 3200.00, type: 'INCOME', date: '2024-01-14' },
      { id: 3, description: 'Gas Station', amount: -45.00, type: 'EXPENSE', date: '2024-01-13' },
      { id: 4, description: 'Freelance Work', amount: 500.00, type: 'INCOME', date: '2024-01-12' },
    ],
    budgetAlerts: [
      { category: 'Entertainment', spent: 450, budget: 500, percentage: 90 },
      { category: 'Dining Out', spent: 380, budget: 400, percentage: 95 },
    ],
  };

  const StatCard: React.FC<{
    title: string;
    value: string;
    icon: React.ReactNode;
    color: string;
    trend?: string;
  }> = ({ title, value, icon, color, trend }) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography color="textSecondary" gutterBottom variant="h6">
              {title}
            </Typography>
            <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
              {value}
            </Typography>
            {trend && (
              <Typography variant="body2" color="textSecondary">
                {trend}
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              backgroundColor: color,
              borderRadius: '50%',
              p: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcome back, {user?.firstName}!
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        Here's an overview of your financial status
      </Typography>

      {/* Overview Cards */}
      <Box 
        sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: 3, 
          mt: 2,
          '& > *': {
            flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 18px)' }
          }
        }}
      >
        <StatCard
          title="Total Balance"
          value={`$${mockData.totalBalance.toLocaleString()}`}
          icon={<AccountBalance sx={{ color: 'white' }} />}
          color="#1976d2"
          trend="+2.5% from last month"
        />
        <StatCard
          title="Monthly Income"
          value={`$${mockData.monthlyIncome.toLocaleString()}`}
          icon={<TrendingUp sx={{ color: 'white' }} />}
          color="#2e7d32"
          trend="+5.2% from last month"
        />
        <StatCard
          title="Monthly Expenses"
          value={`$${mockData.monthlyExpenses.toLocaleString()}`}
          icon={<TrendingDown sx={{ color: 'white' }} />}
          color="#d32f2f"
          trend="-1.8% from last month"
        />
        <StatCard
          title="Savings"
          value={`$${mockData.savings.toLocaleString()}`}
          icon={<Receipt sx={{ color: 'white' }} />}
          color="#ed6c02"
          trend="+8.1% from last month"
        />
      </Box>

      {/* Recent Transactions and Budget Alerts */}
      <Box 
        sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: 3, 
          mt: 3,
          '& > *': {
            flex: { xs: '1 1 100%', md: '1 1 calc(50% - 12px)' }
          }
        }}
      >
        {/* Recent Transactions */}
        <Paper sx={{ p: 2, height: '400px' }}>
          <Typography variant="h6" gutterBottom>
            Recent Transactions
          </Typography>
          <List>
            {mockData.recentTransactions.map((transaction) => (
              <ListItem key={transaction.id} divider>
                <ListItemIcon>
                  {transaction.type === 'INCOME' ? (
                    <TrendingUp color="success" />
                  ) : (
                    <TrendingDown color="error" />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={transaction.description}
                  secondary={transaction.date}
                />
                <Chip
                  label={`$${Math.abs(transaction.amount).toFixed(2)}`}
                  color={transaction.type === 'INCOME' ? 'success' : 'error'}
                  variant="outlined"
                />
              </ListItem>
            ))}
          </List>
        </Paper>

        {/* Budget Alerts */}
        <Paper sx={{ p: 2, height: '400px' }}>
          <Typography variant="h6" gutterBottom>
            Budget Alerts
          </Typography>
          <List>
            {mockData.budgetAlerts.map((alert, index) => (
              <ListItem key={index} divider>
                <ListItemIcon>
                  {alert.percentage >= 90 ? (
                    <Warning color="warning" />
                  ) : (
                    <CheckCircle color="success" />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={alert.category}
                  secondary={`$${alert.spent} / $${alert.budget}`}
                />
                <Chip
                  label={`${alert.percentage}%`}
                  color={alert.percentage >= 90 ? 'warning' : 'success'}
                  variant="outlined"
                />
              </ListItem>
            ))}
          </List>
          {mockData.budgetAlerts.length === 0 && (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="200px"
            >
              <Typography color="textSecondary">
                No budget alerts at the moment
              </Typography>
            </Box>
          )}
        </Paper>
      </Box>

      {/* Quick Actions */}
      <Paper sx={{ p: 2, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Quick Actions
        </Typography>
        <Box 
          sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 2,
            '& > *': {
              flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', md: '1 1 calc(25% - 12px)' }
            }
          }}
        >
          <Card sx={{ cursor: 'pointer', '&:hover': { elevation: 4 } }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Receipt sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
              <Typography variant="h6">Add Transaction</Typography>
            </CardContent>
          </Card>
          <Card sx={{ cursor: 'pointer', '&:hover': { elevation: 4 } }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <AccountBalance sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
              <Typography variant="h6">Create Budget</Typography>
            </CardContent>
          </Card>
          <Card sx={{ cursor: 'pointer', '&:hover': { elevation: 4 } }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <TrendingUp sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
              <Typography variant="h6">View Reports</Typography>
            </CardContent>
          </Card>
          <Card sx={{ cursor: 'pointer', '&:hover': { elevation: 4 } }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <AccountBalance sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
              <Typography variant="h6">Link Account</Typography>
            </CardContent>
          </Card>
        </Box>
      </Paper>
    </Box>
  );
};

export default Dashboard; 