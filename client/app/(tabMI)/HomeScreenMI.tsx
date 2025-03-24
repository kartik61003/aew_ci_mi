import React, { useState, useEffect, useRef, useCallback } from "react";
import { Text, StyleSheet, ScrollView, Animated, View, TouchableOpacity } from "react-native";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";
import { router, useFocusEffect } from "expo-router";

const HomeScreenMI: React.FC = () => {
    const auth = useAuth();
    const user = auth?.user;
    const fadeAnim = useRef(new Animated.Value(0)).current;


  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const formattedDate = currentTime.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "2-digit" });

    // Static Data
  
  

    const [requests, setRequests] = useState<{
        _id: string;
        user: { _id: string; username: string; email: string; phone: string; };
        Customer_info: { Customer_name: string; Customer_address: string; Customer_phone: string; Customer_email: string; };
        Old_Meter_info: { Meter_id: string; Meter_type: string; Meter_kwh: string; Meter_kvah: string; Meter_status: string; };
        request_status: "pending" | "completed";
    }[]>([]);

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

    const allocatedJobs = requests.length;
    const completedJobs = requests.filter((request) => request.request_status === 'completed').length;
    const pendingJobs = requests.filter((request) => request.request_status === 'pending').length;
    const TodayVisitCount = requests.filter((request) => request.request_status === 'completed').length;
    const TotalVisitCount = requests.length;

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
                <Text style= {styles.welcomeText}>Welcome {user?.user.username}</Text>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.dateText}>{`${formattedDate}`}</Text>
                        <Text style={styles.timeText}>Today at {formattedTime}</Text>
                    </View>

                    <View style={styles.row}>
                        <View style={styles.card}>
                            <TouchableOpacity onPress={() => router.replace('/MeterInstallScreen')}>
                            <Text style={styles.cardTitle}>Allocated</Text>
                            <Text style={styles.cardValue}>{allocatedJobs}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.card}>
                        <TouchableOpacity onPress={() => router.replace('/MeterInstallScreen')}>
                            <Text style={styles.cardTitle}>Completed</Text>
                            <Text style={styles.cardValue}>{completedJobs}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.infoCard}>
                        <Text style={styles.infoTitle}>Today Visit</Text>
                        <Text style={styles.infoValue}>{TodayVisitCount}</Text>
                    </View>
                    <View style={styles.infoCard}>
                        <Text style={styles.infoTitle}>Total Visit</Text>
                        <Text style={styles.infoValue}>{TotalVisitCount}</Text>
                    </View>
                    <View style={styles.infoCard}>
                        <Text style={styles.infoTitle}>Pending Visit</Text>
                        <Text style={styles.infoValue}>{pendingJobs}</Text>
                    </View>

                    <View style={styles.chartContainer}>
                        <Text style={styles.chartTitle}>Total Allocated Jobs {allocatedJobs}</Text>
                        <View style={styles.legend}>
                            <Text style={{ color: "red", fontSize:11 }}>⬤ Total Pending: {pendingJobs}</Text>
                            <Text style={{ color: "green", fontSize:11 }}>⬤ Total Completed: {completedJobs}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </Animated.View>
    );
}
export default HomeScreenMI;


const styles = StyleSheet.create({

        container: { flex: 1, backgroundColor: "f5f5f5", padding: 15 },
        header: { backgroundColor: "red", padding: 15, borderRadius: 10, alignItems: "center" },
        dateText: { fontSize: 18, fontWeight: "bold", color: "white" },
        timeText: { fontSize: 14, color: "white" },
      
        row: { flexDirection: "row", justifyContent: "space-between", marginVertical: 10 },
        card: { backgroundColor: "#fff", padding: 15, borderRadius: 10, width: "48%", alignItems: "center", elevation: 5 },
        cardTitle: { fontSize: 16, color: "black" },
        cardValue: { fontSize: 20, fontWeight: "bold", color: "black" },
      
        infoCard: { backgroundColor: "#fff", padding: 15, borderRadius: 10, marginVertical: 5, elevation: 3 },
        infoTitle: { fontSize: 16, color: "black" },
        infoValue: { fontSize: 18, fontWeight: "bold", color: "black", textAlign: "right" },
      
        chartContainer: { backgroundColor: "#fff", padding: 10, borderRadius: 10, marginVertical: 9, elevation: 5 },
        chartTitle: { textAlign: "center", fontSize: 16, fontWeight: "bold", marginBottom: 10 },
        legend: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
      
        version: { textAlign: "center", fontSize: 14, color: "gray", marginTop: 20 },

    scrollContainer: {
        padding: 10,
        justifyContent: 'center',
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
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