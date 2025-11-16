import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PortfolioAnalyticsProps {
    isDarkMode: boolean;
}

const performanceData = [
  { month: 'Jan', value: 50000 },
  { month: 'Feb', value: 55000 },
  { month: 'Mar', value: 62000 },
  { month: 'Apr', value: 58000 },
  { month: 'May', value: 75000 },
  { month: 'Jun', value: 81000 },
];

const PortfolioAnalytics: React.FC<PortfolioAnalyticsProps> = ({ isDarkMode }) => {
  const styles = getStyles(isDarkMode);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Portfolio Analytics</Text>
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Portfolio Value Over Time</Text>
        <View style={styles.chart}>
          <ResponsiveContainer>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#4a5568' : '#e5e7eb'} />
              <XAxis dataKey="month" stroke={isDarkMode ? '#9ca3af' : '#6b7280'} />
              <YAxis stroke={isDarkMode ? '#9ca3af' : '#6b7280'} tickFormatter={(value) => `$${value/1000}k`} />
              <Tooltip cursor={{fill: isDarkMode ? 'rgba(55, 65, 81, 0.5)' : 'rgba(229, 231, 235, 0.5)'}} contentStyle={styles.tooltip} formatter={(value: number) => [`$${value.toLocaleString()}`, 'Value']} />
              <Legend />
              <Bar dataKey="value" fill="#3b82f6" name="Portfolio Value" />
            </BarChart>
          </ResponsiveContainer>
        </View>
      </View>
      <View style={styles.comingSoon}><Text style={styles.comingSoonText}>More advanced analytics and visualizations coming soon.</Text></View>
    </View>
  );
}

const getStyles = (isDarkMode: boolean) => StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24, color: isDarkMode ? '#ffffff' : '#111827' },
  chartContainer: { backgroundColor: isDarkMode ? '#1f2937' : '#ffffff', padding: 16, borderRadius: 8 },
  chartTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 16, color: isDarkMode ? '#ffffff' : '#111827' },
  chart: { height: 300, width: '100%' },
  tooltip: { backgroundColor: isDarkMode ? '#1f2937' : '#ffffff', borderWidth: 1, borderColor: isDarkMode ? '#374151' : '#e5e7eb' },
  comingSoon: { marginTop: 32, alignItems: 'center' },
  comingSoonText: { color: isDarkMode ? '#9ca3af' : '#6b7280' },
});

export default PortfolioAnalytics;
