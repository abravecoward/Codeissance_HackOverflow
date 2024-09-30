import React, { useState } from 'react';
import { AlertCircle, AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';
import Input from './ui/input'; // Ensure it's a default import
import { Card, CardHeader, CardContent } from './ui/card';

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
    <div className="space-y-4 p-4">
      <h2 className="text-2xl font-bold">System Settings</h2>
      <p className="mb-4">Configure data sources, alert thresholds, and other system parameters.</p>

      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold">Data Source Configuration</h3>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSaveSettings} className="space-y-4">
            <div>
              <label className="block mb-1" htmlFor="dataSource">Data Source URL:</label>
              <Input
                id="dataSource"
                type="text"
                value={dataSource}
                onChange={(e) => setDataSource(e.target.value)}
                placeholder="Enter data source URL"
                className="w-full"
              />
            </div>

            <div>
              <label className="block mb-1" htmlFor="alertThreshold">Alert Threshold (%):</label>
              <Input
                id="alertThreshold"
                type="number"
                value={alertThreshold}
                onChange={(e) => setAlertThreshold(e.target.value)}
                placeholder="Set alert threshold"
                className="w-full"
              />
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={notificationEnabled}
                  onChange={() => setNotificationEnabled(!notificationEnabled)}
                  className="mr-2"
                />
                Enable Notifications
              </label>
            </div>

            <Button type="submit" className="mt-2">Save Settings</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold">System Alerts</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center">
              <AlertCircle className="mr-2 text-red-600" />
              <span>High-risk transaction alerts will be sent when risk score exceeds threshold.</span>
            </div>
            <div className="flex items-center">
              <AlertTriangle className="mr-2 text-yellow-600" />
              <span>Medium-risk transaction alerts are informational and for review.</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
