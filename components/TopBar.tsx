import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface TopBarProps {
    isDarkMode: boolean;
    setIsDarkMode: (value: boolean) => void;
}

const TopBar: React.FC<TopBarProps> = ({ isDarkMode, setIsDarkMode }) => {
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const styles = getStyles(isDarkMode);

    return (
        <View style={styles.header}>
            {/* Left Side: Branding */}
            <View style={styles.brandingContainer}>
                <MaterialCommunityIcons name="currency-usd" size={32} color={isDarkMode ? '#60a5fa' : '#3b82f6'} />
                <View>
                    <Text style={styles.headerTitle}>CryptoPulse Gemini</Text>
                    <Text style={styles.headerSubtitle}>Live cryptocurrency price</Text>
                </View>
            </View>

            {/* Right Side: Icons and Menus */}
            <View style={styles.menuContainer}>
                {/* Theme Switcher */}
                <TouchableOpacity onPress={() => setIsDarkMode(!isDarkMode)} style={styles.iconButton}>
                    <MaterialCommunityIcons name={isDarkMode ? 'weather-sunny' : 'weather-night'} size={24} color={isDarkMode ? '#facc15' : '#6b7280'} />
                </TouchableOpacity>

                {/* Settings Dropdown */}
                <View>
                    <TouchableOpacity onPress={() => setSettingsOpen(!settingsOpen)} style={styles.iconButton}>
                        <MaterialCommunityIcons name="cog" size={24} color={isDarkMode ? '#d1d5db' : '#6b7280'} />
                    </TouchableOpacity>
                    {settingsOpen && (
                        <View style={styles.dropdown}>
                            <TouchableOpacity style={styles.dropdownItem}>
                                <MaterialCommunityIcons name="cog" size={20} style={styles.dropdownIcon} />
                                <Text style={styles.dropdownText}>Settings</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.dropdownItem}>
                                <MaterialCommunityIcons name="help-circle" size={20} style={styles.dropdownIcon} />
                                <Text style={styles.dropdownText}>Help & Support</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.dropdownItem}>
                                <MaterialCommunityIcons name="chart-bar" size={20} style={styles.dropdownIcon} />
                                <Text style={styles.dropdownText}>API Status</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.dropdownItem}>
                                <MaterialCommunityIcons name="send" size={20} style={styles.dropdownIcon} />
                                <Text style={styles.dropdownText}>Send Feedback</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
                
                {/* Avatar Dropdown */}
                 <View>
                    <TouchableOpacity onPress={() => setProfileOpen(!profileOpen)} style={styles.iconButton}>
                       <MaterialCommunityIcons name="account-circle" size={32} color={isDarkMode ? '#d1d5db' : '#6b7280'} />
                    </TouchableOpacity>
                    {profileOpen && (
                        <View style={styles.dropdown}>
                            <View style={styles.profileInfo}>
                                <Text style={styles.profileName}>John Doe</Text>
                                <Text style={styles.profileEmail}>johndoe@cryptoapp.com</Text>
                            </View>
                            <View style={styles.separator}></View>
                            <TouchableOpacity style={styles.dropdownItem}>
                                <MaterialCommunityIcons name="account" size={20} style={styles.dropdownIcon} />
                                <Text style={styles.dropdownText}>Profile</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.dropdownItem}>
                                <MaterialCommunityIcons name="cogs" size={20} style={styles.dropdownIcon} />
                                <Text style={styles.dropdownText}>Preferences</Text>
                            </TouchableOpacity>
                            <View style={styles.separator}></View>
                            <TouchableOpacity style={styles.dropdownItem}>
                                <MaterialCommunityIcons name="logout" size={20} style={styles.dropdownIcon} />
                                <Text style={styles.dropdownText}>Sign Out</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        </View>
    );
};

const getStyles = (isDarkMode: boolean) => StyleSheet.create({
    header: {
        backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
        zIndex: 50,
    },
    brandingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 12,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: isDarkMode ? '#ffffff' : '#111827',
    },
    headerSubtitle: {
        fontSize: 12,
        color: isDarkMode ? '#9ca3af' : '#6b7280',
        marginTop: -4,
    },
    menuContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 8,
    },
    iconButton: {
        padding: 8,
        borderRadius: 9999,
    },
    dropdown: {
        position: 'absolute',
        right: 0,
        marginTop: 40,
        width: 224,
        backgroundColor: isDarkMode ? '#374151' : '#ffffff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
        zIndex: 50,
    },
    dropdownItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    dropdownIcon: {
        marginRight: 12,
        color: isDarkMode ? '#d1d5db' : '#6b7280',
    },
    dropdownText: {
        fontSize: 14,
        color: isDarkMode ? '#d1d5db' : '#374151',
    },
    profileInfo: {
        padding: 16,
    },
    profileName: {
        fontSize: 14,
        fontWeight: '600',
        color: isDarkMode ? '#ffffff' : '#111827',
    },
    profileEmail: {
        fontSize: 12,
        color: isDarkMode ? '#9ca3af' : '#6b7280',
    },
    separator: {
        height: 1,
        backgroundColor: isDarkMode ? '#4b5563' : '#e5e7eb',
    },
});

export default TopBar;