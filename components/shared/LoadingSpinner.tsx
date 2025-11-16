
import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

interface LoadingSpinnerProps {
    size?: 'small' | 'large';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'large' }) => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={size} color="#3b82f6" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default LoadingSpinner;
