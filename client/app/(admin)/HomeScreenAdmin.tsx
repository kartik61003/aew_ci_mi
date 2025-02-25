import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Animated, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { registerUser } from '../../service/register';
import { useNavigation } from "@react-navigation/native";

interface Option {
    value: 'CI' | 'MI';
    label: string;
}

const options: Option[] = [
    { value: 'CI', label: 'CI' },
    { value: 'MI', label: 'MI' },
];

const RegisterForm: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [role, setRole] = useState<'CI' | 'MI'>(options[0].value);
    const [phone, setPhone] = useState<string>('');

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation();

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    useEffect(() => {
        navigation.setOptions({ title: "Add new Employee" }); // Set the screen title
    }, [navigation]);

    const handleSubmit = async () => {
        if (!username || !email || !password || !role || !phone) {
            Alert.alert('Validation Error', 'All fields are required');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert('Validation Error', 'Please enter a valid email address');
            return;
        }
        if(phone.length !== 10){
            Alert.alert('Validation Error', 'Please enter a valid phone number');
            return
        }

        try {
            const data = { username, email, phone, password, role };
            await registerUser(data);
            Alert.alert('Success', 'User Created successfully');
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert('Error', error.message);
            } else {
                Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
            }
        } finally {
            setUsername('');
            setEmail('');
            setPhone('');
            setPassword('');
        }
    };

    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Name:</Text>
                <TextInput
                    style={styles.input}
                    value={username}
                    onChangeText={setUsername}
                    placeholder="Enter Candidate Name"
                    placeholderTextColor="#888"
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Email:</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter Candidate email"
                    keyboardType="email-address"
                    placeholderTextColor="#888"
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                    style={styles.input}
                    value={phone}
                    onChangeText={setPhone}
                    placeholder="Enter Candidate Phone Number"
                    keyboardType="phone-pad"
                    placeholderTextColor="#888"
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Password:</Text>
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholder="Create Candidate password"
                    placeholderTextColor="#888"
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Role:</Text>
                <RNPickerSelect
                    onValueChange={(value: 'CI' | 'MI') => setRole(value)}
                    items={options.map(option => ({ label: option.label, value: option.value }))}
                    value={role}
                    style={pickerSelectStyles}
                />
            </View>
            <Button title="Register" onPress={handleSubmit} />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 12,
        backgroundColor: '#f5f5f5',
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

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30,
        backgroundColor: '#fff',
        fontFamily: 'Arial',
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30,
        backgroundColor: '#fff',
        fontFamily: 'Arial',
    },
});

export default RegisterForm;