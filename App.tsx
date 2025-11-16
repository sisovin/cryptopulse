import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, useColorScheme, Platform } from 'react-native';
import { Screen } from './types';
import TopBar from './components/TopBar';
import Footer from './components/Footer';
import MarketOverview from './components/MarketOverview';
import PortfolioSummary from './components/PortfolioSummary';
import PortfolioAnalytics from './components/PortfolioAnalytics';
import PriceAnalysisCenter from './components/PriceAnalysisCenter';
import WatchlistMonitor from './components/WatchlistMonitor';
import CryptoDetail from './components/CryptoDetail';

const App: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<Screen>(Screen.MarketOverview);
  const [selectedCryptoId, setSelectedCryptoId] = useState<string | null>(null);
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');

  useEffect(() => {
    setIsDarkMode(colorScheme === 'dark');
  }, [colorScheme]);

  const handleNavigateToDetail = useCallback((cryptoId: string) => {
    setSelectedCryptoId(cryptoId);
    setActiveScreen(Screen.CryptoDetail);
  }, []);

  const handleBackFromDetail = useCallback(() => {
    setSelectedCryptoId(null);
    setActiveScreen(Screen.MarketOverview);
  }, []);

  const renderScreen = () => {
    if (activeScreen === Screen.CryptoDetail && selectedCryptoId) {
      return <CryptoDetail cryptoId={selectedCryptoId} onBack={handleBackFromDetail} isDarkMode={isDarkMode} />;
    }

    switch (activeScreen) {
      case Screen.MarketOverview:
        return <MarketOverview onSelectCrypto={handleNavigateToDetail} />;
      case Screen.PortfolioSummary:
        return <PortfolioSummary isDarkMode={isDarkMode} />;
      case Screen.PortfolioAnalytics:
        return <PortfolioAnalytics isDarkMode={isDarkMode} />;
      case Screen.PriceAnalysisCenter:
        return <PriceAnalysisCenter isDarkMode={isDarkMode} />;
      case Screen.WatchlistMonitor:
        return <WatchlistMonitor />;
      default:
        return <MarketOverview onSelectCrypto={handleNavigateToDetail} />;
    }
  };

  return (
    <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      <TopBar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <View style={styles.main}>
        {renderScreen()}
      </View>
      {activeScreen !== Screen.CryptoDetail && (
        <Footer activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  },
  darkContainer: {
    backgroundColor: '#1a202c',
  },
  lightContainer: {
    backgroundColor: '#f7fafc',
  },
  main: {
    flex: 1,
    paddingBottom: 20,
  },
});

export default App;
