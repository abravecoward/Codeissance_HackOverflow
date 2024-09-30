import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardContent } from './ui/card';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

const MLDetection = () => {
  const [patternData, setPatternData] = useState([]);
  const [detectedAnomalies, setDetectedAnomalies] = useState([]);

  useEffect(() => {
    generatePatternData();
    generateAnomalies();
  }, []);

  const generatePatternData = () => {
    const patterns = ['Structuring', 'Layering', 'Integration', 'Smurfing', 'Shell Companies'];
    const newData = patterns.map(pattern => ({
      name: pattern,
      value: Math.floor(Math.random() * 50) + 10,
    }));
    setPatternData(newData);
  };

  const generateAnomalies = () => {
    const anomalyTypes = ['Large Deposit', 'Rapid Transactions', 'Unusual Pattern', 'High-Risk Country'];
    const newAnomalies = Array.from({ length: 5 }, () => ({
      type: anomalyTypes[Math.floor(Math.random() * anomalyTypes.length)],
      score: Math.floor(Math.random() * 100),
      time: new Date().toLocaleTimeString(),
    }));
    setDetectedAnomalies(newAnomalies);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold">ML-Driven Pattern Detection</h2>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={patternData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#3498db" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <Button onClick={generatePatternData} className="mt-4">Refresh Analysis</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold">Detected Anomalies</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {detectedAnomalies.map((anomaly, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-md ${anomaly.score > 80 ? 'bg-red-500' : 'bg-yellow-500'}`}
              >
                <p className="font-semibold">{anomaly.type}</p>
                <p>Score: {anomaly.score}</p>
                <p className="text-sm">Detected at: {anomaly.time}</p>
              </motion.div>
            ))}
          </div>
          <Button onClick={generateAnomalies} className="mt-4">Generate New Anomalies</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default MLDetection;