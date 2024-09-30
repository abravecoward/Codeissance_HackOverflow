import React, { useState } from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { AlertCircle, TrendingUp, AlertTriangle, FileText, Settings as SettingsIcon, Brain } from 'lucide-react';
import RealTimeAnalysis from './RealTimeAnalysis';
import MLDetection from './MLDetection';
import RiskScoring from './RiskScoring';
import Reports from './Reports';
import Settings from './Settings';
import AIInsights from './AIInsights';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabData = [
    { icon: <AlertCircle size={24} />, label: 'Real-time', component: <RealTimeAnalysis /> },
    { icon: <TrendingUp size={24} />, label: 'ML Detection', component: <MLDetection /> },
    { icon: <AlertTriangle size={24} />, label: 'Risk Scoring', component: <RiskScoring /> },
    { icon: <Brain size={24} />, label: 'AI Insights', component: <AIInsights /> },
    { icon: <FileText size={24} />, label: 'Reports', component: <Reports /> },
    { icon: <SettingsIcon size={24} />, label: 'Settings', component: <Settings /> },
  ];

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box className="dashboard">
      <Typography variant="h1" sx={{ mb: 4 }}>
        AI-Powered AML System
      </Typography>
      <Tabs value={activeTab} onChange={handleTabChange} aria-label="AML system tabs">
        {tabData.map((tab, index) => (
          <Tab
            key={index}
            icon={tab.icon}
            label={tab.label}
            sx={{
              '&.Mui-selected': {
                color: 'primary.main',
              },
            }}
          />
        ))}
      </Tabs>
      <Box sx={{ mt: 2 }}>
        {tabData[activeTab].component}
      </Box>
    </Box>
  );
};

export default Dashboard;