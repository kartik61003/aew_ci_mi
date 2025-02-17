import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, Button, StyleSheet, Animated, Alert, ScrollView } from "react-native";
import { useAuth } from "../../hooks/useAuth";
import { router } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { createCi } from "@/service/ci";



export default function CreateCiRequest() {
    const auth = useAuth();
    const user = auth?.user;
    const navigation = useNavigation();
    const logout = auth?.logout;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const [customerName, setCustomerName] = useState<string>('');
    const [customerAddress, setCustomerAddress] = useState<string>('');
    const [customerPhone, setCustomerPhone] = useState<string>('');
    const [customerEmail, setCustomerEmail] = useState<string>('');
    const [oldMeterId, setOldMeterId] = useState<string>('');
    const [oldMeterType, setOldMeterType] = useState<string>('');
    const [oldMeterKwh, setOldMeterKwh] = useState<string>('');
    const [oldMeterKvah, setOldMeterKvah] = useState<string>('');
    const [oldMeterStatus, setOldMeterStatus] = useState<string>('');

    useEffect(() => {
        navigation.setOptions({ title: "FILL CI FORM" });
    }, [navigation]);

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    const handleLogout = async () => {
        if (logout) {
            try {
                console.log('Logging out...');
                await logout();
                console.log('Logout successful, redirecting to LoginForm');
                router.replace("/(auth)/LoginForm");
            } catch (error) {
                console.error('Logout failed:', error);
            }
        }
    };

    const handleSubmit = async () => {
        if (!customerName || !customerAddress || !customerPhone || !customerEmail || !oldMeterId || !oldMeterType || !oldMeterKwh || !oldMeterKvah || !oldMeterStatus) {
            Alert.alert('Validation Error', 'All fields are required');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(customerEmail)) {
            Alert.alert('Validation Error', 'Please enter a valid email address');
            return;
        }
        if (customerPhone.length !== 10) {
            Alert.alert('Validation Error', 'Please enter a valid phone number');
            return;
        }

        try {
            const data = {
                user: {
                    _id: user?.user._id || '',
                    username: user?.user.username || '',
                    phone: user?.user.phone || '',
                    email: user?.user.email || '',
                },
                Customer_info: {
                    Customer_name: customerName,
                    Customer_address: customerAddress,
                    Customer_phone: customerPhone,
                    Customer_email: customerEmail,
                },
                Old_Meter_info: {
                    Meter_id: oldMeterId,
                    Meter_type: oldMeterType,
                    Meter_kwh: oldMeterKwh,
                    Meter_kvah: oldMeterKvah,
                    Meter_status: oldMeterStatus,
                }
            };

            console.log('Submitting Form:', data);
            await createCi(data);
            Alert.alert('Success', 'Form submitted successfully');
            setCustomerName('');
            setCustomerAddress('');
            setCustomerPhone('');
            setCustomerEmail('');
            setOldMeterId('');
            setOldMeterType('');
            setOldMeterKwh('');
            setOldMeterKvah('');
            setOldMeterStatus('');

        } catch (error) {
            if (error instanceof Error) {
                console.log(error);
                Alert.alert('Error', error.message);
            } else {
                Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
            }
        }
    };

    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.sectionTitle}>Customer Details</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Customer Name:</Text>
                    <TextInput
                        style={styles.input}
                        value={customerName}
                        onChangeText={setCustomerName}
                        placeholder="Enter Customer Name"
                        placeholderTextColor="#888"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Customer Address:</Text>
                    <TextInput
                        style={styles.input}
                        value={customerAddress}
                        onChangeText={setCustomerAddress}
                        placeholder="Enter Customer Address"
                        placeholderTextColor="#888"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Customer Phone:</Text>
                    <TextInput
                        style={styles.input}
                        value={customerPhone}
                        onChangeText={setCustomerPhone}
                        placeholder="Enter Customer Phone"
                        keyboardType="phone-pad"
                        placeholderTextColor="#888"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Customer Email:</Text>
                    <TextInput
                        style={styles.input}
                        value={customerEmail}
                        onChangeText={setCustomerEmail}
                        placeholder="Enter Customer Email"
                        keyboardType="email-address"
                        placeholderTextColor="#888"
                    />
                </View>

                <Text style={styles.sectionTitle}>Old Meter Details</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Old Meter ID:</Text>
                    <TextInput
                        style={styles.input}
                        value={oldMeterId}
                        onChangeText={setOldMeterId}
                        placeholder="Enter Old Meter ID"
                        placeholderTextColor="#888"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Old Meter Type:</Text>
                    <TextInput
                        style={styles.input}
                        value={oldMeterType}
                        onChangeText={setOldMeterType}
                        placeholder="Enter Old Meter Type"
                        placeholderTextColor="#888"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Old Meter kWh:</Text>
                    <TextInput
                        style={styles.input}
                        value={oldMeterKwh}
                        onChangeText={setOldMeterKwh}
                        placeholder="Enter Old Meter kWh"
                        placeholderTextColor="#888"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Old Meter kVah:</Text>
                    <TextInput
                        style={styles.input}
                        value={oldMeterKvah}
                        onChangeText={setOldMeterKvah}
                        placeholder="Enter Old Meter kVh"
                        placeholderTextColor="#888"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Old Meter Status:</Text>
                    <TextInput
                        style={styles.input}
                        value={oldMeterStatus}
                        onChangeText={setOldMeterStatus}
                        placeholder="Enter Old Meter Status"
                        placeholderTextColor="#888"
                    />
                </View>
                <Button title="Submit" onPress={handleSubmit} />
                <Button title="Logout" onPress={handleLogout} />
            </ScrollView>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollContainer: {
        padding: 12,
        justifyContent: 'center',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
        fontFamily: 'Arial',
    },
    inputContainer: {
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#333',
        fontFamily: 'Arial',
    },
    input: {
        height: 40,
        marginBottom: 2,
        paddingHorizontal: 5,
        borderRadius: 8,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 10,
        fontFamily: 'Arial',
    },
});