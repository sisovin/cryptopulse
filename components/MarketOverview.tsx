import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { CryptoCurrency } from '../types';
import { getTopCryptos } from '../services/cryptoService';
import LoadingSpinner from './shared/LoadingSpinner';

interface MarketOverviewProps {
  onSelectCrypto: (cryptoId: string) => void;
}

const CryptoRow: React.FC<{ crypto: CryptoCurrency, onSelect: (id: string) => void }> = ({ crypto, onSelect }) => {
  const priceChangeColor = crypto.price_change_percentage_24h >= 0 ? '#10b981' : '#ef4444';
  
  return (
    <TouchableOpacity 
      style={styles.cryptoRow}
      onPress={() => onSelect(crypto.id)}
    >
      <View style={styles.cryptoInfo}>
        <Image source={{ uri: crypto.image }} style={styles.cryptoImage} />
        <View>
          <Text style={styles.cryptoName}>{crypto.name}</Text>
          <Text style={styles.cryptoSymbol}>{crypto.symbol.toUpperCase()}</Text>
        </View>
      </View>
      <View style={styles.cryptoPrice}>
        <Text style={styles.priceText}>${crypto.current_price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
      </View>
      <View style={styles.cryptoChange}>
        <Text style={{ color: priceChangeColor }}>{crypto.price_change_percentage_24h.toFixed(2)}%</Text>
      </View>
    </TouchableOpacity>
  );
};


const MarketOverview: React.FC<MarketOverviewProps> = ({ onSelectCrypto }) => {
  const [cryptos, setCryptos] = useState<CryptoCurrency[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getTopCryptos();
        setCryptos(data);
      } catch (err) {
        setError('Failed to fetch data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <View style={styles.centered}><ActivityIndicator size="large" /></View>;
  if (error) return <View style={styles.centered}><Text style={styles.errorText}>{error}</Text></View>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Market Overview</Text>
      <View style={styles.listContainer}>
        <FlatList
          data={cryptos}
          renderItem={({ item }) => <CryptoRow crypto={item} onSelect={onSelectCrypto} />}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#ef4444',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#111827',
  },
  listContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    overflow: 'hidden',
  },
  cryptoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  cryptoInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cryptoImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 16,
  },
  cryptoName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  cryptoSymbol: {
    fontSize: 12,
    color: '#6b7280',
  },
  cryptoPrice: {
    flex: 1,
    alignItems: 'flex-end',
  },
  priceText: {
    fontSize: 16,
  },
  cryptoChange: {
    flex: 1,
    alignItems: 'flex-end',
  },
  separator: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginLeft: 72,
  },
});

export default MarketOverview;
