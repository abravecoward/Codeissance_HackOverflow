import React, { useState } from 'react';
import { Card, CardHeader, CardContent, Button, TextField, Typography, Box, Switch, FormControlLabel } from '@mui/material';
import { AlertCircle, AlertTriangle } from 'lucide-react';

const Settings = () => {
  const [dataSource, setDataSource] = useState('');
  const [alertThreshold, setAlertThreshold] = useState(80);
  const [notificationEnabled, setNotificationEnabled] = useState(true);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    // Handle saving the settings (e.g., send to an API or save to local storage)
    console.log({
      dataSource,
      alertThreshold,
      notificationEnabled,
    });
  };

  return (
    <Box sx={{ p: 2, color: 'var(--text-color)' }}>
      <Typography variant="h4" gutterBottom sx={{ color: 'var(--primary-color)' }}>System Settings</Typography>
      <Typography variant="body1" paragraph>
        Configure data sources, alert thresholds, and other system parameters.
      </Typography>

      <Card sx={{ bgcolor: 'var(--card-background)', color: 'var(--text-color)' }}>
        <CardHeader title="Data Source Configuration" sx={{ color: 'var(--primary-color)' }} />
        <CardContent>
          <Box component="form" onSubmit={handleSaveSettings}>
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Data Source URL"
                value={dataSource}
                onChange={(e) => setDataSource(e.target.value)}
                placeholder="Enter data source URL"
                sx={{
                  '& .MuiInputBase-input': { color: 'var(--text-color)' },
                  '& .MuiInputLabel-root': { color: 'var(--text-color)' },
                  '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'var(--border-color)' } },
                }}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                type="number"
                label="Alert Threshold (%)"
                value={alertThreshold}
                onChange={(e) => setAlertThreshold(e.target.value)}
                placeholder="Set alert threshold"
                sx={{
                  '& .MuiInputBase-input': { color: 'var(--text-color)' },
                  '& .MuiInputLabel-root': { color: 'var(--text-color)' },
                  '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'var(--border-color)' } },
                }}
              />
            </Box>

            <FormControlLabel
              control={
                <Switch
                  checked={notificationEnabled}
                  onChange={() => setNotificationEnabled(!notificationEnabled)}
                  sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: 'var(--primary-color)' } }}
                />
              }
              label="Enable Notifications"
            />

            <Button type="submit" variant="contained" sx={{ mt: 2, bgcolor: 'var(--secondary-color)', '&:hover': { bgcolor: 'var(--secondary-color-dark)' } }}>
              Save Settings
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ mt: 2, bgcolor: 'var(--card-background)', color: 'var(--text-color)' }}>
        <CardHeader title="System Alerts" sx={{ color: 'var(--primary-color)' }} />
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <AlertCircle color="var(--accent-color)" sx={{ mr: 1 }} />
            <Typography variant="body2">
              High-risk transaction alerts will be sent when risk score exceeds threshold.
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AlertTriangle color="var(--secondary-color)" sx={{ mr: 1 }} />
            <Typography variant="body2">
              Medium-risk transaction alerts are informational and for review.
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Settings;