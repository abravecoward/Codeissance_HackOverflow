import React, { useState } from 'react';
import { Box, Typography, Button, CircularProgress, Alert, Grid, Paper } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Reports = () => {
  const [file, setFile] = useState(null);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
    setError(null);
  };

  const analyzeFile = async () => {
    if (!file) {
      setError('Please select a file first.');
      return;
    }

    setLoading(true);
    setError(null);

    // Simulating API call
    setTimeout(() => {
      setReport({
        accuracy: 0.95,
        confusion_matrix: [[980, 20], [30, 970]],
        classification_report: {
          precision: 0.94,
          recall: 0.97,
          f1_score: 0.95
        },
        feature_importance: {
          "Transaction Amount": 0.25,
          "Transaction Frequency": 0.2,
          "Account Age": 0.15,
          "Location": 0.1,
          "Time of Day": 0.08,
          "Transaction Type": 0.07,
          "Customer Risk Score": 0.06,
          "IP Address": 0.04,
          "Device Type": 0.03,
          "Currency": 0.02
        }
      });
      setLoading(false);
    }, 2000);
  };

  const renderConfusionMatrix = () => {
    if (!report || !report.confusion_matrix) return null;

    return (
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Confusion Matrix</Typography>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ padding: '8px', border: '1px solid #ddd', backgroundColor: '#f5f5f5' }}>Predicted / Actual</th>
              <th style={{ padding: '8px', border: '1px solid #ddd', backgroundColor: '#f5f5f5' }}>Normal</th>
              <th style={{ padding: '8px', border: '1px solid #ddd', backgroundColor: '#f5f5f5' }}>Suspicious</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #ddd', fontWeight: 'bold' }}>Normal</td>
              <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>{report.confusion_matrix[0][0]}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>{report.confusion_matrix[0][1]}</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #ddd', fontWeight: 'bold' }}>Suspicious</td>
              <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>{report.confusion_matrix[1][0]}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>{report.confusion_matrix[1][1]}</td>
            </tr>
          </tbody>
        </table>
      </Paper>
    );
  };

  const renderFeatureImportance = () => {
    if (!report || !report.feature_importance) return null;

    const data = Object.entries(report.feature_importance)
      .map(([name, value]) => ({ name, value: parseFloat(value.toFixed(4)) }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10);

    return (
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Top 10 Feature Importance</Typography>
        <Box sx={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" interval={0} height={70} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Paper>
    );
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.setTextColor(79, 70, 229);
    doc.text('Transaction Analysis Report', 105, 15, null, null, 'center');
    
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(`Model Accuracy: ${(report.accuracy * 100).toFixed(2)}%`, 20, 30);
    
    doc.setFontSize(16);
    doc.setTextColor(79, 70, 229);
    doc.text('Confusion Matrix', 20, 45);
    doc.autoTable({
      head: [['Predicted / Actual', 'Normal', 'Suspicious']],
      body: [
        ['Normal', report.confusion_matrix[0][0], report.confusion_matrix[0][1]],
        ['Suspicious', report.confusion_matrix[1][0], report.confusion_matrix[1][1]]
      ],
      startY: 50,
      headStyles: { fillColor: [79, 70, 229] }
    });
    
    doc.setFontSize(16);
    doc.setTextColor(79, 70, 229);
    doc.text('Classification Report', 20, doc.lastAutoTable.finalY + 15);
    doc.autoTable({
      head: [['Metric', 'Value']],
      body: Object.entries(report.classification_report),
      startY: doc.lastAutoTable.finalY + 20,
      headStyles: { fillColor: [79, 70, 229] }
    });
    
    doc.setFontSize(16);
    doc.setTextColor(79, 70, 229);
    doc.text('Feature Importance', 20, doc.lastAutoTable.finalY + 15);
    doc.autoTable({
      head: [['Feature', 'Importance']],
      body: Object.entries(report.feature_importance)
        .sort((a, b) => b[1] - a[1])
        .map(([feature, importance]) => [feature, importance.toFixed(4)]),
      startY: doc.lastAutoTable.finalY + 20,
      headStyles: { fillColor: [79, 70, 229] }
    });
    
    doc.save('transaction_analysis_report.pdf');
  };

  return (
    <Box sx={{ maxWidth: 'lg', mx: 'auto', backgroundColor: 'black', color: 'white' }}>
      <Paper elevation={3} sx={{ p: 3, mb: 3, backgroundColor: 'black', color: 'white', p: 3 }}>
        <Typography variant="h4" gutterBottom>Transaction Analysis Report</Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <input
              accept=".csv"
              id="raised-button-file"
              type="file"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
            <label htmlFor="raised-button-file">
              <Button variant="contained" component="span">
                Upload CSV
              </Button>
            </label>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              onClick={analyzeFile}
              disabled={!file || loading}
              color="primary"
            >
              {loading ? <CircularProgress size={24} /> : 'Analyze'}
            </Button>
          </Grid>
        </Grid>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
        )}

        {report && (
          <Box sx={{ mt: 4 }}>
            <Alert severity="info" sx={{ mb: 3 }}>
              <Typography variant="h6">Model Accuracy: {(report.accuracy * 100).toFixed(2)}%</Typography>
            </Alert>
            
            {renderConfusionMatrix()}
            {renderFeatureImportance()}

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Button variant="contained" onClick={downloadPDF} color="secondary">
                Download PDF Report
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default Reports;