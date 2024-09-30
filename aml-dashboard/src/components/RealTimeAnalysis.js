import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, TextField, Button, Card, CardContent, Grid } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../styles/RealTimeAnalysis.css';

const RealTimeAnalysis = () => {
  const [transactions, setTransactions] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [riskScore, setRiskScore] = useState(0);
  const [aiPrediction, setAiPrediction] = useState('');

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
      addAlert(`High-risk transaction detected: $${transaction.amount} to ${transaction.recipient}`, score);
      setAiPrediction('Potential money laundering attempt');
    } else if (score > 60) {
      addAlert(`Medium-risk transaction detected: $${transaction.amount} to ${transaction.recipient}`, score);
      setAiPrediction('Unusual activity detected');
    } else {
      setAiPrediction('Transaction appears normal');
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
      <Typography variant="h4" gutterBottom>Real-time AML Transaction Analysis</Typography>
      <Typography variant="body1" paragraph>
        Our AI is analyzing transactions in real-time, instantly identifying suspicious activities.
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Recipient"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button type="submit" variant="contained" fullWidth>Send Transaction</Button>
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
            <Line yAxisId="left" type="monotone" dataKey="amount" stroke="#8884d8" name="Transaction Amount" />
            <Line yAxisId="right" type="monotone" dataKey="score" stroke="#82ca9d" name="Risk Score" />
          </LineChart>
        </ResponsiveContainer>
      </Box>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card className="ai-feature">
            <CardContent>
              <Typography variant="h6" gutterBottom>AI Risk Assessment</Typography>
              <Typography variant="h4" color={riskScore > 80 ? 'error' : riskScore > 60 ? 'warning.main' : 'success.main'}>
                {riskScore.toFixed(2)}
              </Typography>
              <Typography variant="body2">Current transaction risk score</Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>AI Prediction: {aiPrediction}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Real-time Alerts</Typography>
              {alerts.map((alert, index) => (
                <Box key={index} sx={{ mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">[{alert.time}]</Typography>
                  <Typography variant="body1">{alert.message}</Typography>
                  <Typography variant="body2">Score: {alert.score.toFixed(2)}</Typography>
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