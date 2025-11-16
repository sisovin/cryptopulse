import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Image, useColorScheme } from 'react-native';
import { getCryptoDetails } from '../services/cryptoService';
import { CryptoCurrency, PriceDataPoint } from '../types';
import LoadingSpinner from './shared/LoadingSpinner';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Svg, Defs, LinearGradient, Stop } from 'react-native-svg';

interface CryptoDetailProps {
  cryptoId: string;
  onBack: () => void;
}

const StatCard: React.FC<{ label: string; value: string; isDarkMode: boolean }> = ({ label, value, isDarkMode }) => {
    const styles = getStatCardStyles(isDarkMode);
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
        </View>
    );
};

const CryptoDetail: React.FC<CryptoDetailProps> = ({ cryptoId, onBack }) => {
  const [crypto, setCrypto] = useState<{ details: CryptoCurrency, history: PriceDataPoint[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isDarkMode = useColorScheme() === 'dark';
  const styles = getCryptoDetailStyles(isDarkMode);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getCryptoDetails(cryptoId);
        setCrypto(data);
      } catch (err) {
        setError('Failed to fetch details.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [cryptoId]);

  if (loading) return <View style={styles.centered}><LoadingSpinner /></View>;
  if (error || !crypto) return <View style={styles.centered}><Text style={styles.errorText}>{error || 'Crypto not found.'}</Text></View>;

  const { details, history } = crypto;
  const priceChangeColor = details.price_change_percentage_24h >= 0 ? '#10B981' : '#EF4444';

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <MaterialCommunityIcons name="arrow-left" size={20} color={isDarkMode ? '#60A5FA' : '#3B82F6'} />
        <Text style={styles.backButtonText}>Back to Markets</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <Image source={{ uri: details.image }} style={styles.image} />
        <View>
          <Text style={styles.headerTitle}>{details.name}</Text>
          <Text style={styles.headerSubtitle}>{details.symbol.toUpperCase()}</Text>
        </View>
      </View>
      
      <View style={styles.priceContainer}>
        <Text style={styles.price}>${details.current_price.toLocaleString()}</Text>
        <Text style={[styles.priceChange, { color: priceChangeColor }]}>{details.price_change_percentage_24h.toFixed(2)}% (24h)</Text>
      </View>

      <View style={styles.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={history} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
             <Defs>
              <LinearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                <Stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </LinearGradient>
            </Defs>
            <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#4A5568' : '#E5E7EB'} />
            <XAxis dataKey="date" stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} fontSize={12} />
            <YAxis stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} fontSize={12} tickFormatter={(value) => `$${(value/1000)}k`} />
            <Tooltip
              contentStyle={{ backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF', border: `1px solid ${isDarkMode ? '#374151' : '#E5E7EB'}` }}
              labelStyle={{ color: isDarkMode ? '#D1D5DB' : '#1F2937' }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, 'Price']}
            />
            <Area type="monotone" dataKey="price" stroke="#3b82f6" fillOpacity={1} fill="url(#colorPrice)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </View>
      
      <Text style={styles.statsTitle}>Market Stats</Text>
       <View style={styles.statsGrid}>
            <StatCard isDarkMode={isDarkMode} label="Market Cap" value={`$${(details.market_cap / 1_000_000_000).toFixed(2)}B`} />
            <StatCard isDarkMode={isDarkMode} label="Volume (24h)" value={`$${(details.total_volume / 1_000_000_000).toFixed(2)}B`} />
            <StatCard isDarkMode={isDarkMode} label="Circulating Supply" value={`${(details.circulating_supply / 1_000_000).toFixed(2)}M`} />
            <StatCard isDarkMode={isDarkMode} label="All-Time High" value={`$${details.ath.toLocaleString()}`} />
            <StatCard isDarkMode={isDarkMode} label="Market Cap Rank" value={`#${details.market_cap_rank}`} />
            <StatCard isDarkMode={isDarkMode} label="24h High" value={`$${details.high_24h.toLocaleString()}`} />
        </View>
    </View>
  );
};

const getCryptoDetailStyles = (isDarkMode: boolean) => StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: isDarkMode ? '#F87171' : '#EF4444',
        marginTop: 8,
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: isDarkMode ? '#111827' : '#F9FAFB',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    backButtonText: {
        color: isDarkMode ? '#60A5FA' : '#3B82F6',
        marginLeft: 8,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    image: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 16,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: isDarkMode ? '#F9FAFB' : '#111827',
    },
    headerSubtitle: {
        color: isDarkMode ? '#9CA3AF' : '#6B7280',
        textTransform: 'uppercase',
    },
    priceContainer: {
        marginBottom: 24,
    },
    price: {
        fontSize: 36,
        fontWeight: 'bold',
        color: isDarkMode ? '#F9FAFB' : '#111827',
    },
    priceChange: {
        fontSize: 20,
        fontWeight: '600',
    },
    chartContainer: {
        height: 320,
        width: '100%',
        marginBottom: 32,
    },
    statsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        color: isDarkMode ? '#F9FAFB' : '#111827',
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
});

const getStatCardStyles = (isDarkMode: boolean) => StyleSheet.create({
    container: {
        backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
        padding: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        width: '48%',
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        color: isDarkMode ? '#9CA3AF' : '#6B7280',
    },
    value: {
        fontSize: 18,
        fontWeight: '600',
        color: isDarkMode ? '#F9FAFB' : '#111827',
    },
});

export default CryptoDetail;
