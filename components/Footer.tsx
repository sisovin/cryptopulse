import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Screen } from '../types';

interface FooterProps {
  activeScreen: Screen;
  setActiveScreen: (screen: Screen) => void;
}

const navItems = [
  { screen: Screen.MarketOverview, label: 'Markets', icon: 'home' },
  { screen: Screen.PortfolioSummary, label: 'Portfolio', icon: 'chart-bar' },
  { screen: Screen.PortfolioAnalytics, label: 'Analytics', icon: 'file-chart' },
  { screen: Screen.PriceAnalysisCenter, label: 'Analysis', icon: 'magnify' },
  { screen: Screen.WatchlistMonitor, label: 'Watchlist', icon: 'star' },
];

const Footer: React.FC<FooterProps> = ({ activeScreen, setActiveScreen }) => {
  return (
    <View style={styles.footer}>
      <View style={styles.nav}>
        {navItems.map((item) => {
          const isActive = activeScreen === item.screen;
          return (
            <TouchableOpacity
              key={item.label}
              onPress={() => setActiveScreen(item.screen)}
              style={styles.navButton}
            >
              <MaterialCommunityIcons name={item.icon} size={24} color={isActive ? '#3b82f6' : '#6b7280'} />
              <Text style={[styles.navLabel, isActive && styles.activeNavLabel]}>{item.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 64,
    maxWidth: 500,
    alignSelf: 'center',
    width: '100%',
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navLabel: {
    fontSize: 10,
    fontWeight: '500',
    color: '#6b7280',
  },
  activeNavLabel: {
    color: '#3b82f6',
  },
});

export default Footer;
