import { useState, useEffect } from "react";
import { TextInput, Button, Text, StyleSheet, Alert, Animated } from "react-native";
import { useAuth } from "../../hooks/useAuth";
import { Link, router } from "expo-router";
import { useNavigation } from "@react-navigation/native";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const auth = useAuth();
    const navigation = useNavigation();
    const fadeAnim = useState(new Animated.Value(0))[0];
    const user = auth?.user;

    const login = auth?.login;

    useEffect(() => {
        navigation.setOptions({ title: "AEW Login Form" });
    }, [navigation]);

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Validation Error', 'Email and password are required');
            return;
        }

        if (login) {
            try {
                await login(email, password);
                if(user?.user.role === "CI") router.replace("/(tabs)/HomeScreenCi");
                else if(user?.user.role === "MI") router.replace("/(tabs)/HomeScreenMI");
                
            } catch (error) {
                if (error instanceof Error) {
                    Alert.alert('Login failed', error.message);
                } else {
                    Alert.alert('Login failed', 'An unknown error occurred');
                }
            }
        }
    };

    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholderTextColor="#888"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor="#888"
            />
            <Button title="Login" onPress={handleLogin} />
            <Link href="/(auth)/RegisterForm" style={styles.link}>Register</Link>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: 'center',
        color: '#333',
        fontFamily: 'Arial',
    },
    input: {
        height: 40,
        marginBottom: 16,
        paddingHorizontal: 8,
        borderRadius: 8,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 2,
        fontFamily: 'Arial',
    },
    link: {
        textAlign: 'center',
        marginTop: 16,
        color: 'blue',
        fontFamily: 'Arial',
    },
});

