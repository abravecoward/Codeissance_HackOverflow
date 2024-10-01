import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid, Card, CardContent } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MLDetection = () => {
  const [patternData, setPatternData] = useState([]);
  const [detectedAnomalies, setDetectedAnomalies] = useState([]);
  const [modelAccuracy, setModelAccuracy] = useState(0);

  useEffect(() => {
    generatePatternData();
    generateAnomalies();
    updateModelAccuracy();
  }, []);

  const generatePatternData = () => {
    const patterns = ['Structuring', 'Layering', 'Integration', 'Smurfing', 'Shell Companies', 'Trade-Based ML', 'Crypto Mixing'];
    const newData = patterns.map(pattern => ({
      name: pattern,
      value: Math.floor(Math.random() * 50) + 10,
    }));
    setPatternData(newData);
  };

  const generateAnomalies = () => {
    const anomalyTypes = [
      'Large Deposit', 'Rapid Transactions', 'Unusual Pattern', 'High-Risk Country',
      'Structuring Attempt', 'Unexpected Behavior', 'Account Takeover'
    ];
    const newAnomalies = Array.from({ length: 5 }, () => ({
      type: anomalyTypes[Math.floor(Math.random() * anomalyTypes.length)],
      score: Math.floor(Math.random() * 100),
      time: new Date().toLocaleTimeString(),
    }));
    setDetectedAnomalies(newAnomalies);
  };

  const updateModelAccuracy = () => {
    setModelAccuracy(95 + Math.random() * 4);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>ML-Driven Pattern Detection</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Box sx={{ height: 400, mb: 4 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={patternData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className="ai-feature">
            <CardContent>
              <Typography variant="h6" gutterBottom>Model Accuracy</Typography>
              <Typography variant="h4" color="primary">{modelAccuracy.toFixed(2)}%</Typography>
              <Button onClick={updateModelAccuracy} variant="contained" sx={{ mt: 2 }}>
                Retrain Model
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Button onClick={() => { generatePatternData(); generateAnomalies(); }} variant="contained" sx={{ mb: 4 }}>
        Refresh Analysis
      </Button>
      <Typography variant="h5" gutterBottom>Detected Anomalies</Typography>
      <Grid container spacing={2}>
        {detectedAnomalies.map((anomaly, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ bgcolor: anomaly.score > 80 ? 'error.main' : 'warning.main', color: 'white' }}>
              <CardContent>
                <Typography variant="h6">{anomaly.type}</Typography>
                <Typography variant="body1">Score: {anomaly.score}</Typography>
                <Typography variant="body2">Detected at: {anomaly.time}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MLDetection;