import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  Divider,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../../contexts/AuthContext';
import { PasswordUpdate } from '../../types';
import { userApi } from '../../services/api';

const profileSchema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Please enter a valid email').required('Email is required'),
  phoneNumber: yup.string().required('Phone number is required'),
}).required();

const passwordSchema = yup.object({
  currentPassword: yup.string().required('Current password is required'),
  newPassword: yup.string().min(6, 'Password must be at least 6 characters').required('New password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('newPassword')], 'Passwords must match').required('Please confirm your password'),
}).required();

const UserProfile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [profileError, setProfileError] = useState<string>('');
  const [profileSuccess, setProfileSuccess] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [passwordSuccess, setPasswordSuccess] = useState<string>('');
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);

  const profileForm = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phoneNumber: user?.phoneNumber || '',
    },
  });

  const passwordForm = useForm({
    resolver: yupResolver(passwordSchema),
  });

  const onProfileSubmit = async (data: any) => {
    setIsProfileLoading(true);
    setProfileError('');
    setProfileSuccess('');
    
    try {
      await updateUser(data);
      setProfileSuccess('Profile updated successfully!');
    } catch (err: any) {
      setProfileError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsProfileLoading(false);
    }
  };

  const onPasswordSubmit = async (data: any) => {
    setIsPasswordLoading(true);
    setPasswordError('');
    setPasswordSuccess('');
    
    try {
      const passwordData: PasswordUpdate = {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      };
      await userApi.updatePassword(passwordData);
      setPasswordSuccess('Password updated successfully!');
      passwordForm.reset();
    } catch (err: any) {
      setPasswordError(err.response?.data?.message || 'Failed to update password');
    } finally {
      setIsPasswordLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>

      <Box sx={{ mt: 3 }}>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Profile Information
          </Typography>
          <Divider sx={{ mb: 2 }} />

          {profileError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {profileError}
            </Alert>
          )}

          {profileSuccess && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {profileSuccess}
            </Alert>
          )}

          <Box component="form" onSubmit={profileForm.handleSubmit(onProfileSubmit)}>
            <Controller
              name="firstName"
              control={profileForm.control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  required
                  fullWidth
                  label="First Name"
                  error={!!profileForm.formState.errors.firstName}
                  helperText={profileForm.formState.errors.firstName?.message}
                />
              )}
            />

            <Controller
              name="lastName"
              control={profileForm.control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  required
                  fullWidth
                  label="Last Name"
                  error={!!profileForm.formState.errors.lastName}
                  helperText={profileForm.formState.errors.lastName?.message}
                />
              )}
            />

            <Controller
              name="email"
              control={profileForm.control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  required
                  fullWidth
                  label="Email"
                  error={!!profileForm.formState.errors.email}
                  helperText={profileForm.formState.errors.email?.message}
                />
              )}
            />

            <Controller
              name="phoneNumber"
              control={profileForm.control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  required
                  fullWidth
                  label="Phone Number"
                  error={!!profileForm.formState.errors.phoneNumber}
                  helperText={profileForm.formState.errors.phoneNumber?.message}
                />
              )}
            />

            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 2 }}
              disabled={isProfileLoading}
            >
              {isProfileLoading ? <CircularProgress size={24} /> : 'Update Profile'}
            </Button>
          </Box>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Change Password
          </Typography>
          <Divider sx={{ mb: 2 }} />

          {passwordError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {passwordError}
            </Alert>
          )}

          {passwordSuccess && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {passwordSuccess}
            </Alert>
          )}

          <Box component="form" onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}>
            <Controller
              name="currentPassword"
              control={passwordForm.control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  required
                  fullWidth
                  label="Current Password"
                  type="password"
                  error={!!passwordForm.formState.errors.currentPassword}
                  helperText={passwordForm.formState.errors.currentPassword?.message}
                />
              )}
            />

            <Controller
              name="newPassword"
              control={passwordForm.control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  required
                  fullWidth
                  label="New Password"
                  type="password"
                  error={!!passwordForm.formState.errors.newPassword}
                  helperText={passwordForm.formState.errors.newPassword?.message}
                />
              )}
            />

            <Controller
              name="confirmPassword"
              control={passwordForm.control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  required
                  fullWidth
                  label="Confirm New Password"
                  type="password"
                  error={!!passwordForm.formState.errors.confirmPassword}
                  helperText={passwordForm.formState.errors.confirmPassword?.message}
                />
              )}
            />

            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 2 }}
              disabled={isPasswordLoading}
            >
              {isPasswordLoading ? <CircularProgress size={24} /> : 'Change Password'}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default UserProfile; 