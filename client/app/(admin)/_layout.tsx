import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Tabs } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from "../../hooks/useAuth";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';


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
                <Tabs
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: '#f4511e', // Set header background color
                        },
                        headerTintColor: '#fff', // Set header text color
                        headerTitleStyle: {
                            fontWeight: 'bold', // Set header title style
                        },
                        tabBarActiveTintColor: 'red'
                    }}
                >
                    <Tabs.Screen name="NewCiRequest" options={{
                        title: 'File New CI',
                        tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
                        headerShown: true
                    }} />

                    <Tabs.Screen name="HomeScreenAdmin" options={{ 
                        title: 'Register a Candidate',
                        tabBarIcon: ({ color }) => <AntDesign size={28} name="adduser" color={color} />, 
                        headerShown: true }} />
                    <Tabs.Screen name="Details"  options={{ 
                        title: 'Details',
                        tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />, 
                        headerShown: true }} />
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
