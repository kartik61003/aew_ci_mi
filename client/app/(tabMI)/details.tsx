import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useAuth } from "../../hooks/useAuth";
import { router } from "expo-router";

export default function DetailsScreen() {
    const auth = useAuth();
    const user = auth?.user;
    const logout = auth?.logout;

    const handleLogout = async () => {
        if (logout) {
            try {
                console.log("Logging out...");
                await logout();
                console.log("Logout successful, redirecting to LoginForm");
                router.replace("/(auth)/LoginForm");
            } catch (error) {
                console.error("Logout failed:", error);
            }
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>User Details</Text>
                <View style={styles.infoBox}>
                    <Text style={styles.label}>Username</Text>
                    <Text style={styles.info}>{user?.user.username || "N/A"}</Text>
                </View>
                <View style={styles.infoBox}>
                    <Text style={styles.label}>Email</Text>
                    <Text style={styles.info}>{user?.user.email || "N/A"}</Text>
                </View>
                <View style={styles.infoBox}>
                    <Text style={styles.label}>Phone</Text>
                    <Text style={styles.info}>{user?.user.phone || "N/A"}</Text>
                </View>
                <View style={styles.infoBox}>
                    <Text style={styles.label}>Role</Text>
                    <Text style={styles.info}>{user?.user.role || "N/A"}</Text>
                </View>
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F8F9FA",
    },
    card: {
        width: "85%",
        backgroundColor: "#FFFFFF",
        padding: 24,
        borderRadius: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
        elevation: 6,
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 15,
        color: "#333",
    },
    infoBox: {
        width: "100%",
        padding: 12,
        marginVertical: 6,
        borderWidth: 1,
        borderColor: "#DDD",
        borderRadius: 8,
        backgroundColor: "#FAFAFA",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        color: "#555",
    },
    info: {
        fontSize: 16,
        color: "#222",
        marginTop: 4,
    },
    logoutButton: {
        marginTop: 20,
        backgroundColor: "#FF4B5C",
        paddingVertical: 14,
        paddingHorizontal: 22,
        borderRadius: 10,
        width: "100%",
        alignItems: "center",
        shadowColor: "#FF4B5C",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    logoutText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "700",
    },
});