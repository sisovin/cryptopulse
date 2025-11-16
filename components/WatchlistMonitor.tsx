import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { CryptoCurrency } from '../types';
import { getTopCryptos } from '../services/cryptoService';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const WatchlistMonitor: React.FC = () => {
    const [allCryptos, setAllCryptos] = useState<CryptoCurrency[]>([]);
    const [watchlist, setWatchlist] = useState<CryptoCurrency[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCryptoToAdd, setSelectedCryptoToAdd] = useState<string>('');

    useEffect(() => {
        const fetchWatchlistData = async () => {
            setLoading(true);
            const cryptos = await getTopCryptos();
            setAllCryptos(cryptos);
            setWatchlist(cryptos.slice(0, 3));
            const remainingCryptos = cryptos.slice(3);
            if (remainingCryptos.length > 0) {
              setSelectedCryptoToAdd(remainingCryptos[0].id);
            }
            setLoading(false);
        };
        fetchWatchlistData();
    }, []);

    const handleAddCrypto = useCallback(() => {
        if (!selectedCryptoToAdd) return;

        const cryptoExists = watchlist.some(c => c.id === selectedCryptoToAdd);
        if (cryptoExists) {
            Alert.alert("Crypto Already in Watchlist", "This cryptocurrency is already in your watchlist.");
            return;
        }

        const cryptoToAdd = allCryptos.find(c => c.id === selectedCryptoToAdd);
        if (cryptoToAdd) {
            setWatchlist(prev => [...prev, cryptoToAdd]);
        }
    }, [selectedCryptoToAdd, allCryptos, watchlist]);
    
    const handleRemoveCrypto = (cryptoId: string) => {
        setWatchlist(prev => prev.filter(c => c.id !== cryptoId));
    };

    if (loading) return <View style={styles.centered}><ActivityIndicator size="large" /></View>;

    const availableCryptos = allCryptos.filter(c => !watchlist.some(w => w.id === c.id));

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Watchlist</Text>
            
            <View style={styles.addCryptoContainer}>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={selectedCryptoToAdd}
                        onValueChange={(itemValue) => setSelectedCryptoToAdd(itemValue)}
                        style={styles.picker}
                    >
                        {availableCryptos.map(crypto => (
                            <Picker.Item key={crypto.id} label={crypto.name} value={crypto.id} />
                        ))}
                    </Picker>
                </View>
                <TouchableOpacity onPress={handleAddCrypto} style={styles.addButton}>
                    <MaterialCommunityIcons name="plus-circle" size={24} color="#ffffff" />
                    <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
            </View>
            
            <FlatList
                data={watchlist}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.cryptoRow}>
                        <View style={styles.cryptoInfo}>
                            <Text style={styles.cryptoName}>{item.name}</Text>
                            <Text style={styles.cryptoSymbol}>{item.symbol.toUpperCase()}</Text>
                        </View>
                        <Text style={styles.cryptoPrice}>${item.current_price.toLocaleString()}</Text>
                        <TouchableOpacity onPress={() => handleRemoveCrypto(item.id)}>
                            <MaterialCommunityIcons name="close-circle" size={24} color="#ef4444" />
                        </TouchableOpacity>
                    </View>
                )}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
            <Text style={styles.dragDropNote}>Drag and drop to reorder (feature coming soon).</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    addCryptoContainer: {
        flexDirection: 'row',
        marginBottom: 24,
    },
    pickerContainer: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 8,
        marginRight: 16,
    },
    picker: {},
    addButton: {
        flexDirection: 'row',
        backgroundColor: '#2563eb',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#ffffff',
        fontWeight: '600',
        marginLeft: 8,
    },
    cryptoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
    },
    cryptoInfo: {
        flex: 1,
    },
    cryptoName: {
        fontWeight: 'bold',
    },
    cryptoSymbol: {
        fontSize: 12,
        color: '#6b7280',
    },
    cryptoPrice: {
        width: 100,
        textAlign: 'right',
    },
    separator: {
        height: 1,
        backgroundColor: '#e5e7eb',
    },
    dragDropNote: {
        textAlign: 'center',
        marginTop: 16,
        color: '#6b7280',
        fontStyle: 'italic',
    },
});

export default WatchlistMonitor;
