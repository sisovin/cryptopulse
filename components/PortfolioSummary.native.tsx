import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { getPortfolio } from '../services/cryptoService';
import { PortfolioAsset } from '../types';
import { VictoryPie } from 'victory-native';
import Svg from 'react-native-svg';

interface PortfolioSummaryProps {
    isDarkMode: boolean;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const PortfolioSummaryNative: React.FC<PortfolioSummaryProps> = ({ isDarkMode }) => {
    const [assets, setAssets] = useState<PortfolioAsset[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPortfolio = async () => {
            setLoading(true);
            const portfolioAssets = await getPortfolio();
            setAssets(portfolioAssets);
            setLoading(false);
        };
        fetchPortfolio();
    }, []);

    const { totalValue, chartData } = useMemo(() => {
        const total = assets.reduce((acc, asset) => acc + asset.amount * asset.current_price, 0);
        const data = assets.map(asset => ({ x: asset.name, y: asset.amount * asset.current_price }));
        return { totalValue: total, chartData: data };
    }, [assets]);

    const styles = getStyles(isDarkMode);
    if (loading) return <View style={styles.centered}><ActivityIndicator size="large" /></View>;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Portfolio</Text>
            <Text style={styles.totalValue}>${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
            <View style={styles.chartContainer}>
                <Svg width="100%" height={300}>
                    <VictoryPie
                        standalone={false}
                        width={350}
                        height={300}
                        data={chartData}
                        colorScale={COLORS}
                        innerRadius={40}
                    />
                </Svg>
            </View>

            <View style={styles.allocationContainer}>
                <Text style={styles.allocationTitle}>Asset Allocation</Text>
                {assets.map((asset, index) => {
                    const value = asset.amount * asset.current_price;
                    const percentage = totalValue > 0 ? (value / totalValue) * 100 : 0;
                    return (
                        <View key={asset.id} style={styles.assetRow}>
                            <View style={styles.assetInfo}>
                                <View style={[styles.assetColor, { backgroundColor: COLORS[index % COLORS.length] }]} />
                                <View>
                                    <Text style={styles.assetName}>{asset.name}</Text>
                                    <Text style={styles.assetAmount}>{asset.amount} {asset.symbol.toUpperCase()}</Text>
                                </View>
                            </View>
                            <View style={styles.assetValue}>
                                <Text style={styles.valueText}>${value.toLocaleString()}</Text>
                                <Text style={styles.percentageText}>{percentage.toFixed(2)}%</Text>
                            </View>
                        </View>
                    );
                })}
            </View>
        </View>
    );
};

const getStyles = (isDarkMode: boolean) => StyleSheet.create({
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    container: { flex: 1, padding: 16 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8, color: isDarkMode ? '#ffffff' : '#111827' },
    totalValue: { fontSize: 32, fontWeight: 'bold', color: isDarkMode ? '#60a5fa' : '#3b82f6', marginBottom: 24 },
    chartContainer: { height: 300, width: '100%', alignItems: 'center', justifyContent: 'center' },
    allocationContainer: { backgroundColor: isDarkMode ? '#1f2937' : '#ffffff', borderRadius: 8, padding: 16, marginTop: 24 },
    allocationTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 16, color: isDarkMode ? '#ffffff' : '#111827' },
    assetRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: isDarkMode ? '#374151' : '#e5e7eb' },
    assetInfo: { flexDirection: 'row', alignItems: 'center' },
    assetColor: { width: 12, height: 12, borderRadius: 6, marginRight: 12 },
    assetName: { fontWeight: 'bold', color: isDarkMode ? '#ffffff' : '#111827' },
    assetAmount: { fontSize: 12, color: isDarkMode ? '#9ca3af' : '#6b7280' },
    assetValue: { alignItems: 'flex-end' },
    valueText: { fontWeight: '600', color: isDarkMode ? '#ffffff' : '#111827' },
    percentageText: { fontSize: 12, color: isDarkMode ? '#9ca3af' : '#6b7280' },
});

export default PortfolioSummaryNative;
