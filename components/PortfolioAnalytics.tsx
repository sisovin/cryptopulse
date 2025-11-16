import { Platform } from 'react-native';

// Platform-bridge: web vs native
let Component: any;
if (Platform.OS === 'web') {
  Component = require('./PortfolioAnalytics.web').default;
} else {
  Component = require('./PortfolioAnalytics.native').default;
}

export default Component as React.FC<any>;

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

// noop: exported via platform-specific implementation above
