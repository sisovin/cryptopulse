import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MOCK_CRYPTOS } from '../constants';
import { analyzeCryptoWithGemini } from '../services/geminiService';

interface PriceAnalysisCenterProps {
  isDarkMode: boolean;
}

const PriceAnalysisCenter: React.FC<PriceAnalysisCenterProps> = ({ isDarkMode }) => {
  const [selectedCrypto, setSelectedCrypto] = useState<string>(MOCK_CRYPTOS[0].id);
  const [analysis, setAnalysis] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalysis = useCallback(async () => {
    const crypto = MOCK_CRYPTOS.find(c => c.id === selectedCrypto);
    if (!crypto) return;

    setLoading(true);
    setError(null);
    setAnalysis('');
    try {
      const result = await analyzeCryptoWithGemini(crypto.name);
      setAnalysis(result);
    } catch (err) {
      setError('Failed to get analysis.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [selectedCrypto]);

  const styles = getStyles(isDarkMode);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gemini Price Analysis</Text>
      
      <View style={styles.analysisContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Select Cryptocurrency</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedCrypto}
              onValueChange={(itemValue) => setSelectedCrypto(itemValue)}
              style={styles.picker}
            >
              {MOCK_CRYPTOS.map(crypto => (
                <Picker.Item key={crypto.id} label={crypto.name} value={crypto.id} />
              ))}
            </Picker>
          </View>
          <TouchableOpacity
            onPress={handleAnalysis}
            disabled={loading}
            style={styles.button}
          >
            {loading ? <ActivityIndicator color="#ffffff" /> : <Text style={styles.buttonText}>Analyze with Gemini</Text>}
          </TouchableOpacity>
        </View>
      </View>
      
      {error && <Text style={styles.errorText}>{error}</Text>}

      {analysis && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Gemini AI Analysis: {MOCK_CRYPTOS.find(c => c.id === selectedCrypto)?.name}</Text>
          <Text style={styles.analysisText}>{analysis}</Text>
        </View>
      )}
    </View>
  );
};

const getStyles = (isDarkMode: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: isDarkMode ? '#ffffff' : '#111827',
  },
  analysisContainer: {
    backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
    padding: 16,
    borderRadius: 8,
  },
  inputContainer: {
    flexDirection: 'column',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: isDarkMode ? '#d1d5db' : '#374151',
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: isDarkMode ? '#4b5563' : '#d1d5db',
    borderRadius: 8,
    marginBottom: 16,
  },
  picker: {
    color: isDarkMode ? '#ffffff' : '#111827',
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  errorText: {
    marginTop: 24,
    textAlign: 'center',
    color: '#ef4444',
  },
  resultContainer: {
    marginTop: 32,
    backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
    padding: 16,
    borderRadius: 8,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: isDarkMode ? '#ffffff' : '#111827',
  },
  analysisText: {
    color: isDarkMode ? '#d1d5db' : '#374151',
    lineHeight: 24,
  },
});

export default PriceAnalysisCenter;
