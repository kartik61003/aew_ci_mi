import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Tabs } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from "../../hooks/useAuth";

export default function RootLayout() {
    const auth = useAuth();
    const role = auth?.user?.user?.role;

    // Show a loading indicator while role is being determined
    if (!role) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <Tabs>
                    <Tabs.Screen name = "HomeScreenCi" options= {{title: 'Ci Form' }}/>
                    <Tabs.Screen name="details" options={{ title: 'Details' }} />
                </Tabs>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
