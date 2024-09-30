import React, { useState, useEffect, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card, CardHeader, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const RealTimeAnalysis = () => {
  const [transactions, setTransactions] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [riskScore, setRiskScore] = useState(0);
  const [transactionDistribution, setTransactionDistribution] = useState([
    { name: 'Low Risk', value: 70 },
    { name: 'Medium Risk', value: 20 },
    { name: 'High Risk', value: 10 },
  ]);

  const COLORS = ['#2ecc71', '#f39c12', '#e74c3c'];

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
      addAlert(`High-risk transaction detected: $${transaction.amount}`, score);
    } else if (score > 60) {
      addAlert(`Medium-risk transaction detected: $${transaction.amount}`, score);
    }
    
    return score;
  }, [addAlert]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomAmount = Math.floor(Math.random() * 10000);
      const transaction = { amount: randomAmount };
      const score = analyzeTransaction(transaction);
      if (score <= 80) {
        addTransaction({ ...transaction, score });
      }

      setTransactionDistribution(prev => {
        const newDist = [...prev];
        if (score > 80) newDist[2].value++;
        else if (score > 60) newDist[1].value++;
        else newDist[0].value++;
        return newDist;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [addTransaction, analyzeTransaction]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold">Transaction Flow</h3>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={transactions}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="amount" stroke="#3498db" name="Amount" />
                  <Line type="monotone" dataKey="score" stroke="#e74c3c" name="Risk Score" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold">Risk Distribution</h3>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={transactionDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {transactionDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold">Current Risk Score</h3>
          </CardHeader>
          <CardContent className="flex justify-center items-center h-64">
            <div style={{ width: '200px', height: '200px' }}>
              <CircularProgressbar
                value={riskScore}
                text={`${riskScore.toFixed(0)}%`}
                styles={buildStyles({
                  textColor: riskScore > 80 ? '#e74c3c' : riskScore > 60 ? '#f39c12' : '#2ecc71',
                  pathColor: riskScore > 80 ? '#e74c3c' : riskScore > 60 ? '#f39c12' : '#2ecc71',
                  trailColor: 'rgba(255,255,255,0.2)',
                })}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold">Real-time Alerts</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {alerts.map((alert, index) => (
              <Alert key={index} variant={alert.score > 80 ? 'destructive' : 'default'}>
                <AlertDescription>
                  [{alert.time}] {alert.message} (Score: {alert.score.toFixed(2)})
                </AlertDescription>
              </Alert>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RealTimeAnalysis;