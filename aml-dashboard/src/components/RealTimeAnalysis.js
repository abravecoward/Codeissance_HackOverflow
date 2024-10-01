import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, TextField, Button, Card, CardContent, Grid } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RealTimeAnalysis = () => {
  const [transactions, setTransactions] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [riskScore, setRiskScore] = useState(0);

  const addTransaction = useCallback((newTransaction) => {
    setTransactions(prev => [...prev, { ...newTransaction, time: new Date().toLocaleTimeString() }].slice(-20));
  }, []);

  const addAlert = useCallback((message, score) => {
    setAlerts(prev => [{ message, score, time: new Date().toLocaleTimeString() }, ...prev.slice(0, 4)]);
  }, []);

  const analyzeTransaction = useCallback((transaction) => {
    const score = Math.random() * 100;
    setRiskScore(score);
    
    if (score > 80) {
      addAlert(`High-risk: $${transaction.amount} to ${transaction.recipient}`, score);
    } else if (score > 60) {
      addAlert(`Medium-risk: $${transaction.amount} to ${transaction.recipient}`, score);
    }
    
    return score;
  }, [addAlert]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const transaction = { amount: parseFloat(amount), recipient };
    const score = analyzeTransaction(transaction);
    addTransaction({ ...transaction, score });
    setAmount('');
    setRecipient('');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const randomAmount = Math.floor(Math.random() * 10000);
      const randomRecipient = `User${Math.floor(Math.random() * 100)}`;
      const transaction = { amount: randomAmount, recipient: randomRecipient };
      const score = analyzeTransaction(transaction);
      addTransaction({ ...transaction, score });
    }, 3000);

    return () => clearInterval(interval);
  }, [addTransaction, analyzeTransaction]);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Real-time AML Analysis</Typography>
      
      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth value={recipient} onChange={(e) => setRecipient(e.target.value)} placeholder="Recipient" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button type="submit" variant="contained" fullWidth>Send</Button>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ height: 300, mb: 4 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={transactions}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="amount" stroke="#8884d8" name="Amount" />
            <Line yAxisId="right" type="monotone" dataKey="score" stroke="#82ca9d" name="Risk Score" />
          </LineChart>
        </ResponsiveContainer>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card className="ai-feature" sx={{ backgroundColor: 'black', color: 'white' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Risk Score</Typography>
              <Typography variant="h4" color={riskScore > 80 ? 'error' : riskScore > 60 ? 'warning' : 'success'}>
                {riskScore.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ backgroundColor: 'black', color: 'white' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Alerts</Typography>
              {alerts.map((alert, index) => (
                <Box key={index} sx={{ mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">[{alert.time}]</Typography>
                  <Typography variant="body1">{alert.message}</Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RealTimeAnalysis;