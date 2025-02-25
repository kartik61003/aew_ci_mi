import { useState, useEffect } from "react";
import { TextInput, Button, Text, StyleSheet, Alert, Animated } from "react-native";
import { useAuth } from "../../hooks/useAuth";
import { router } from "expo-router";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const fadeAnim = useState(new Animated.Value(0))[0];

    const auth = useAuth();
    const login = auth?.login;
    const user = auth?.user; // Get user from auth context

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    useEffect(() => {
        if (user?.user?.role) {
            if (user.user.role === "CI") {
                router.replace("/(tabCI)/HomeScreenCi");
            } else if (user.user.role === "MI") {
                router.replace("/(tabMI)/HomeScreenMI");
            }
            else if(user.user.role === "Admin"){
                router.replace("/(admin)/NewCiRequest");
            } 
            else {
                Alert.alert("Login Error", "Invalid role detected");
            }
        }
    }, [user]); // Re-run when user changes

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Validation Error", "Email and password are required");
            return;
        }

        if (!login) {
            Alert.alert("Login Error", "Login function is not available");
            return;
        }

        try {
            await login(email, password);
        } catch (error) {
            let errorMessage = "An unknown error occurred";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            Alert.alert("Login failed", errorMessage);
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
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 16,
        backgroundColor: "#f5f5f5",
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: "center",
        color: "#333",
        fontFamily: "Arial",
    },
    input: {
        height: 40,
        marginBottom: 16,
        paddingHorizontal: 8,
        borderRadius: 8,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 2,
        fontFamily: "Arial",
    },
});
