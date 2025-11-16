import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { VictoryChart, VictoryBar, VictoryAxis, VictoryTheme, VictoryTooltip, VictoryContainer } from 'victory-native';
import Svg from 'react-native-svg';

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

const PortfolioAnalyticsNative: React.FC<PortfolioAnalyticsProps> = ({ isDarkMode }) => {
  const styles = getStyles(isDarkMode);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Portfolio Analytics</Text>
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Portfolio Value Over Time</Text>
        <Svg width="100%" height={300}>
          <VictoryChart
            standalone={false}
            width={350}
            height={300}
            theme={VictoryTheme.material}
            containerComponent={<VictoryContainer responsive={false} />}
          >
            <VictoryAxis style={{ axis: { stroke: isDarkMode ? '#9CA3AF' : '#6B7280' } }} />
            <VictoryAxis dependentAxis style={{ axis: { stroke: isDarkMode ? '#9CA3AF' : '#6B7280' } }} tickFormat={(v) => `$${v / 1000}k`} />
            <VictoryBar data={performanceData} x="month" y="value" style={{ data: { fill: '#3b82f6' } }} labels={({ datum }) => `$${datum.value}`} labelComponent={<VictoryTooltip />}/>
          </VictoryChart>
        </Svg>
      </View>
      <View style={styles.comingSoon}>
        <Text style={styles.comingSoonText}>More advanced analytics and visualizations coming soon.</Text>
      </View>
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

export default PortfolioAnalyticsNative;
