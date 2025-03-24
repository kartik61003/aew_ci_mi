import { StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <Stack
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: '#f4511e', // Set header background color
                        },
                        headerTintColor: '#fff', // Set header text color
                        headerTitleStyle: {
                            fontWeight: 'bold', // Set header title style
                        },
                    }}>
                    <Stack.Screen name="LoginForm" options={{
                        title: 'AEW Login Form',
                        headerShown: true
                    }} />
                    </Stack>

            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // Ensure the SafeAreaView takes up the full screen
    },
});