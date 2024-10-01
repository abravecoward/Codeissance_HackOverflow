import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AIInsights = () => {
  const [insightData, setInsightData] = useState([]);

  useEffect(() => {
    generateInsightData();
  }, []);

  const generateInsightData = () => {
    const data = [
      { name: 'Fraud', value: Math.floor(Math.random() * 100) },
      { name: 'Money Laundering', value: Math.floor(Math.random() * 100) },
      { name: 'Terrorist Financing', value: Math.floor(Math.random() * 100) },
      { name: 'Cyber Threats', value: Math.floor(Math.random() * 100) },
      { name: 'Regulatory Compliance', value: Math.floor(Math.random() * 100) },
    ];
    setInsightData(data);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>AI-Driven Insights</Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card className="ai-feature" sx={{ backgroundColor: 'black', color: 'white' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Anomaly Detection</Typography>
              <Typography variant="body1">
                Our advanced machine learning models continuously analyze transaction patterns to identify potential anomalies and flag suspicious activities in real-time.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className="ai-feature" sx={{ backgroundColor: 'black', color: 'white' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Predictive Risk Scoring</Typography>
              <Typography variant="body1">
                Utilizing deep learning algorithms, our system predicts future risk levels for customers and transactions, enabling proactive risk management.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className="ai-feature" sx={{ backgroundColor: 'black', color: 'white' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Natural Language Processing</Typography>
              <Typography variant="body1">
                Our NLP models analyze unstructured data from customer communications and transaction descriptions to identify potential red flags and hidden patterns.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className="ai-feature" sx={{ backgroundColor: 'black', color: 'white' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Network Analysis</Typography>
              <Typography variant="body1">
                Graph-based machine learning algorithms map complex relationships between entities to uncover hidden networks and potential money laundering schemes.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>AI-Generated Risk Insights</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={insightData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default AIInsights;