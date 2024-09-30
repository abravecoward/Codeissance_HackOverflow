import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import { Card, CardHeader, CardContent, Button, Typography, Box } from '@mui/material';

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState(null);

  const reportTypes = [
    { title: 'Suspicious Activity Report', data: generateSuspiciousActivityData() },
    { title: 'Transaction Monitoring Report', data: generateTransactionMonitoringData() },
    { title: 'Customer Due Diligence Report', data: generateCustomerDueDiligenceData() },
  ];

  const generatePDF = (reportTitle, reportData) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(reportTitle, 20, 20);
    doc.setFontSize(12);
    let yPosition = 40;
    
    Object.entries(reportData).forEach(([key, value]) => {
      doc.text(`${key}: ${value}`, 20, yPosition);
      yPosition += 10;
    });

    doc.save(`${reportTitle.replace(/\s+/g, '_').toLowerCase()}.pdf`);
  };

  return (
    <Box sx={{ p: 3, bgcolor: 'var(--background-color)', color: 'var(--text-color)' }}>
      <Card sx={{ bgcolor: 'var(--card-background)', color: 'var(--text-color)' }}>
        <CardContent>
          <Typography variant="h4" sx={{ color: 'var(--primary-color)' }} gutterBottom>
            Compliance Reports
          </Typography>
          <Typography variant="body1" sx={{ color: 'var(--text-color)' }} paragraph>
            Generate detailed reports and alerts for compliance purposes, including actionable insights.
          </Typography>

          {reportTypes.map((report, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ color: 'var(--secondary-color)' }} gutterBottom>
                {report.title}
              </Typography>
              <Button
                variant="contained"
                sx={{ mr: 1, bgcolor: 'var(--primary-color)', '&:hover': { bgcolor: 'var(--primary-dark)' } }}
                onClick={() => setSelectedReport(report)}
              >
                View
              </Button>
              <Button
                variant="contained"
                sx={{ bgcolor: 'var(--secondary-color)', '&:hover': { bgcolor: 'var(--secondary-color-dark)' } }}
                onClick={() => generatePDF(report.title, report.data)}
              >
                Download PDF
              </Button>
            </Box>
          ))}

          {selectedReport && (
            <Box sx={{ mt: 4, pt: 2, borderTop: 1, borderColor: 'var(--border-color)' }}>
              <Typography variant="h5" sx={{ color: 'var(--primary-color)' }} gutterBottom>
                {selectedReport.title} Details
              </Typography>
              <pre style={{ backgroundColor: 'var(--card-background)', color: 'var(--text-color)', padding: '16px', borderRadius: '4px', fontSize: '0.875rem', overflowX: 'auto' }}>
                {JSON.stringify(selectedReport.data, null, 2)}
              </pre>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};
function generateSuspiciousActivityData() {
  return {
    totalAlerts: Math.floor(Math.random() * 1000) + 500,
    highRiskTransactions: Math.floor(Math.random() * 200) + 50,
    unresolvedCases: Math.floor(Math.random() * 100) + 20,
    averageResolutionTime: `${Math.floor(Math.random() * 24) + 12} hours`,
    topAlertTypes: [
      "Unusual transaction patterns",
      "Large cash deposits",
      "Multiple transactions just below reporting threshold",
      "Transactions with high-risk countries"
    ],
    recentEscalations: Math.floor(Math.random() * 50) + 10,
    complianceScore: `${(Math.random() * (95 - 80) + 80).toFixed(1)}%`
  };
}

function generateTransactionMonitoringData() {
  return {
    totalTransactions: Math.floor(Math.random() * 1000000) + 500000,
    flaggedTransactions: Math.floor(Math.random() * 5000) + 1000,
    falsePositives: Math.floor(Math.random() * 1000) + 200,
    accuracyRate: `${(Math.random() * (99.9 - 95.0) + 95.0).toFixed(2)}%`,
    averageTransactionValue: `$${(Math.random() * 10000 + 5000).toFixed(2)}`,
    highRiskChannels: [
      "International wire transfers",
      "Cryptocurrency exchanges",
      "Online gambling platforms"
    ],
    monitoringCoverage: `${(Math.random() * (100 - 95) + 95).toFixed(1)}%`,
    alertTrends: {
      increasing: ["Cross-border transactions", "Mobile payments"],
      decreasing: ["ATM withdrawals", "Check deposits"]
    }
  };
}

function generateCustomerDueDiligenceData() {
  return {
    totalCustomers: Math.floor(Math.random() * 100000) + 50000,
    highRiskCustomers: Math.floor(Math.random() * 2000) + 500,
    pendingReviews: Math.floor(Math.random() * 500) + 100,
    averageOnboardingTime: `${Math.floor(Math.random() * 5) + 1} days`,
    enhancedDueDiligenceCases: Math.floor(Math.random() * 1000) + 200,
    customerRiskDistribution: {
      low: `${(Math.random() * (80 - 70) + 70).toFixed(1)}%`,
      medium: `${(Math.random() * (25 - 15) + 15).toFixed(1)}%`,
      high: `${(Math.random() * (10 - 5) + 5).toFixed(1)}%`
    },
    kycCompletionRate: `${(Math.random() * (99 - 95) + 95).toFixed(1)}%`,
    recentlyUpdatedProfiles: Math.floor(Math.random() * 5000) + 1000,
    averageRiskScoreChange: (Math.random() * 0.5 - 0.25).toFixed(2)
  };
}

export default Reports;