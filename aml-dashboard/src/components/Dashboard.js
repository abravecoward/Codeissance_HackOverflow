import React, { useState } from 'react';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, TrendingUp, AlertTriangle, FileText, Settings as SettingsIcon } from 'lucide-react';
import RealTimeAnalysis from './RealTimeAnalysis';
import MLDetection from './MLDetection';
import RiskScoring from './RiskScoring'; // No need to add a new component
import Reports from './Reports';
import Settings from './Settings';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabData = [
    { icon: <AlertCircle size={24} />, label: 'Real-time', component: <RealTimeAnalysis /> },
    { icon: <TrendingUp size={24} />, label: 'ML Detection', component: <MLDetection /> },
    { icon: <AlertTriangle size={24} />, label: 'Risk Scoring', component: <RiskScoring /> }, // Contains both Risk Scoring and Transaction Flow
    { icon: <FileText size={24} />, label: 'Reports', component: <Reports /> },
    { icon: <SettingsIcon size={24} />, label: 'Settings', component: <Settings /> },
  ];

  return (
    <div className="dashboard">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        AI-Powered AML System
      </motion.h1>
      <Tabs selectedIndex={activeTab} onSelect={index => setActiveTab(index)}>
        <TabList>
          {tabData.map((tab, index) => (
            <Tab key={index}>
              <motion.div
                whileHover={{ scale: 1.05, rotateX: 10, rotateY: 10 }}
                whileTap={{ scale: 0.95 }}
                className="tab-content"
              >
                {tab.icon}
                <span className="ml-2">{tab.label}</span>
              </motion.div>
            </Tab>
          ))}
        </TabList>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20, rotateY: -10 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            exit={{ opacity: 0, x: -20, rotateY: 10 }}
            transition={{ duration: 0.3 }}
            className="tab-panel-container"
          >
            {tabData[activeTab].component}
          </motion.div>
        </AnimatePresence>
      </Tabs>
    </div>
  );
};

export default Dashboard;
