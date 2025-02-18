import { View, Text, StyleSheet, Button } from 'react-native';
import { useAuth } from "../../hooks/useAuth";
import { router } from "expo-router";

export default function DetailsScreen() {
    const auth = useAuth();
    const user = auth?.user;   
    const logout = auth?.logout; 


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
    

    return (
        <View style={styles.container}>
            <Text>Details Screen</Text>
            <Text>Username: {user?.user.username}</Text>
            <Text>Logged in as: {user?.user.email}</Text>
            <Button title="Logout" onPress={handleLogout} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
