import React, { useState } from 'react';
import { jsPDF } from 'jspdf';

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
    <div className="p-6 bg-white">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-blue-500 mb-4">Compliance Reports</h2>
        <p className="text-gray-600 mb-6">
          Generate detailed reports and alerts for compliance purposes, including actionable insights.
        </p>

        {reportTypes.map((report, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">{report.title}</h3>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600"
              onClick={() => setSelectedReport(report)}
            >
              View
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={() => generatePDF(report.title, report.data)}
            >
              Download PDF
            </button>
          </div>
        ))}

        {selectedReport && (
          <div className="mt-8 border-t pt-4">
            <h3 className="text-xl font-semibold text-blue-500 mb-2">{selectedReport.title} Details</h3>
            <pre className="bg-gray-100 p-4 rounded text-sm">
              {JSON.stringify(selectedReport.data, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
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