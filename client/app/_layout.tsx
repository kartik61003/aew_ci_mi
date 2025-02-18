import React, { Children } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { Stack, Tabs } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { AuthProvider } from "../context/AuthContext";

export default function RootLayout() {

    return (
        <AuthProvider>
            <SafeAreaProvider>
                <SafeAreaView style={styles.container}>
                    <Stack
                        screenOptions={{
                            headerStyle: {
                                backgroundColor: '#f4511e',
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                        }}>
                    </Stack>
                </SafeAreaView>
            </SafeAreaProvider>
        </AuthProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});