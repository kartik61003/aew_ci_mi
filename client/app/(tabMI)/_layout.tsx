import React from 'react';
import { StyleSheet, View, ActivityIndicator, Text, Image } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useAuth } from "../../hooks/useAuth";
import { FontAwesome } from '@expo/vector-icons';

// Import Screens
import HomeScreenMI from '../(tabMI)/HomeScreenMI';
import Details from './details';
import MeterInstallScreen from './MeterInstallScreen';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props: any) {
    const auth = useAuth();
    const user = auth?.user?.user;
    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.drawerHeader}>
                <Image
                    source={{ uri: 'https://i.ytimg.com/vi/q5dzZMQ1VRE/hqdefault.jpg' }}
                    style={styles.profileImage}
                />
                <Text style={styles.userName}>{user?.username || 'User Name'}</Text>
                <Text style={styles.userPhone}>{user?.phone || 'Phone Number'}</Text>
            </View>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
}


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
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#f4511e', // Set header background color
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                },
                headerTintColor: '#fff', // Set header text color
                headerTitleStyle: {
                    fontWeight: 'bold', // Set header title style
                },
            }}
        >
            <Drawer.Screen
                name="HomeScreenMI"
                component={HomeScreenMI}
                options={{
                    title: 'MI Dashboard',
                    drawerIcon: ({ color }) => <FontAwesome size={24} name="tasks" color={color} />,
                }}
            />
            <Drawer.Screen
                name="MeterInstallScreen"
                component={MeterInstallScreen}
                options={{
                    title: 'Meter Installation',
                    drawerIcon: ({ color }) => <FontAwesome size={24} name="gears" color={color} />,
                }}
            />

            <Drawer.Screen
                name="TackingScreen"
                component={Details}
                options={{
                    title: 'Tracking',
                    drawerIcon: ({ color }) => <FontAwesome size={24} name="map-marker" color={color} />,
                }}
            />
            <Drawer.Screen
                name="TeamInfoScreen"
                component={Details}
                options={{
                    title: 'Team Information',
                    drawerIcon: ({ color }) => <FontAwesome size={24} name="group" color={color} />,
                }}
            />
    
            <Drawer.Screen
                name="AttendenceScreen"
                component={Details}
                options={{
                    title: 'Attendance Screen',
                    drawerIcon: ({ color }) => <FontAwesome size={24} name="calendar-check-o" color={color} />,
                }}
            />

            <Drawer.Screen
                name="PaymentScreen"
                component={Details}
                options={{
                    title: 'Manage Payments',
                    drawerIcon: ({ color }) => <FontAwesome size={24} name="money" color={color} />,
                }}
            />


            <Drawer.Screen
                name="ChallanScreens"
                component={Details}
                options={{
                    title: 'Challans Status',
                    drawerIcon: ({ color }) => <FontAwesome size={24} name="file-text-o" color={color} />,
                }}
            />

            <Drawer.Screen
                name="Details"
                component={Details}
                options={{
                    title: 'User Details',
                    drawerIcon: ({ color }) => <FontAwesome size={24} name="user" color={color} />,
                }}
            />


        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    drawerHeader: {
        padding: 20,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    userPhone: {
        fontSize: 14,
        color: 'gray',
    },
});
