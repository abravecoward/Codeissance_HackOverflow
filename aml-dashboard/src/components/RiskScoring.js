import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, ResponsiveContainer } from 'recharts';  // Added LineChart and Line here
import { Card, CardHeader, CardContent } from './ui/card';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

const RiskScoring = () => {
  const [riskScores, setRiskScores] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    generateRiskScores();
    generateTransactionFlow();
  }, []);

  // Generate Risk Scores (existing logic)
  const generateRiskScores = () => {
    const newScores = Array.from({ length: 5 }, (_, i) => ({
      name: `Transaction ${i + 1}`,
      score: Math.floor(Math.random() * 100),
      amount: Math.floor(Math.random() * 10000),
    }));
    setRiskScores(newScores);
  };

  // Generate Transaction Flow Data (new logic)
  const generateTransactionFlow = () => {
    const flowData = Array.from({ length: 7 }, (_, i) => ({
      time: `Time ${i + 1}`,
      amount: Math.floor(Math.random() * 10000),
    }));
    setTransactions(flowData);
  };

  const getColor = (score) => {
    if (score < 50) return '#2ecc71';
    if (score < 75) return '#f39c12';
    return '#e74c3c';
  };

  return (
    <div className="space-y-4">
      {/* Risk Distribution Section */}
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold">AI-driven Risk Scoring</h2>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskScores}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="score" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <Button onClick={generateRiskScores} className="mt-4">Generate New Scores</Button>
        </CardContent>
      </Card>

      {/* Transaction Flow Section */}
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold">Transaction Flow</h2>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={transactions}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="amount" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Individual Transaction Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {riskScores.map((transaction, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-medium mb-2">{transaction.name}</h3>
                <p className="text-sm text-gray-400 mb-3">Amount: ${transaction.amount}</p>
                <div className="flex items-center">
                  <div className="w-full bg-gray-700 rounded-full h-2.5 mr-2">
                    <div
                      className="h-2.5 rounded-full"
                      style={{ 
                        width: `${transaction.score}%`,
                        backgroundColor: getColor(transaction.score)
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{transaction.score}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RiskScoring;