import React, { useState, useEffect, useRef, useCallback } from "react";
import {Text, StyleSheet, ScrollView, Animated } from "react-native";
import { useAuth } from "../../hooks/useAuth";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import RequestCard from "../../components/RequestCard";

export default function MeterInstallScreen() {

    const auth = useAuth();
    const user = auth?.user;
    const navigation = useNavigation();
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const [requests, setRequests] = useState<{ 
        _id: string; 
        user: { _id: string; username: string; email: string; phone: string; }; 
        Customer_info: { Customer_name: string; Customer_address: string; Customer_phone: string; Customer_email: string; }; 
        Old_Meter_info: { Meter_id: string; Meter_type: string; Meter_kwh: string; Meter_kvah: string; Meter_status: string; };
        request_status: "pending" | "completed"; 
    }[]>([]);
 

    useEffect(() => {
        navigation.setOptions({ title: "MI" });
    }, [navigation]);

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    const fetchRequests = async () => {
        try {
            const response = await axios.get('http://192.168.1.69:5000/getmi');
            setRequests(response.data);
        } catch (error) {
            console.error('Error fetching requests:', error);
        }
    };
    
    useEffect(() => {
        fetchRequests();
    }, []);
    
     useFocusEffect(
            useCallback(() => {
                fetchRequests();
            }, [])
    );


    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.welcomeText}>All MI requests for {user?.user.username}!</Text>

                <Text style={styles.sectionTitle}>MI Requests</Text>
                {requests.map((request) => (
                     <RequestCard key={request._id} request={request} refreshRequests={fetchRequests} />
                ))}
            </ScrollView>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollContainer: {
        padding: 12,
        justifyContent: 'center',
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
        textAlign: 'center',
        fontFamily: 'Arial',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
        fontFamily: 'Arial',
    },
});