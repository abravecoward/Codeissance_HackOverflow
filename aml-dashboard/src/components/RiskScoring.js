import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const RiskScoring = () => {
  const [riskScores, setRiskScores] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    generateRiskScores();
    generateTransactionFlow();
  }, []);

  const generateRiskScores = () => {
    const newScores = Array.from({ length: 5 }, (_, i) => ({
      name: `Transaction ${i + 1}`,
      score: Math.floor(Math.random() * 100),
      amount: Math.floor(Math.random() * 10000),
    }));
    setRiskScores(newScores);
  };

  const generateTransactionFlow = () => {
    const flowData = Array.from({ length: 7 }, (_, i) => ({
      time: `Time ${i + 1}`,
      amount: Math.floor(Math.random() * 10000),
    }));
    setTransactions(flowData);
  };

  const getColor = (score) => {
    if (score < 50) return 'var(--accent-color)';
    if (score < 75) return 'var(--secondary-color)';
    return 'var(--primary-color)';
  };

  return (
    <div className="risk-scoring">
      <h2>AI-driven Risk Scoring</h2>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={riskScores}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="score" fill="var(--primary-color)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <button onClick={generateRiskScores} className="mt-4">
        Generate New Scores
      </button>

      <h2 className="mt-8">Transaction Flow</h2>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={transactions}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="amount" stroke="var(--secondary-color)" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {riskScores.map((transaction, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="card">
              <h3 className="text-lg font-semibold">{transaction.name}</h3>
              <p>Amount: ${transaction.amount}</p>
              <div className="flex items-center mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                  <div
                    className="h-2.5 rounded-full"
                    style={{
                      width: `${transaction.score}%`,
                      backgroundColor: getColor(transaction.score),
                    }}
                  ></div>
                </div>
                <span>{transaction.score}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RiskScoring;