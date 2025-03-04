import React, { useState, useEffect, useRef } from "react";
import { Text, StyleSheet, ScrollView, Animated, View } from "react-native";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";


import RequestCard from "../../components/RequestCard";

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
    const allocatedJobs = 30;
    const completedJobs = 0;
    const pendingJobs = allocatedJobs - completedJobs;
  

    const [requests, setRequests] = useState<{
        _id: string;
        user: { _id: string; username: string; email: string; phone: string; };
        Customer_info: { Customer_name: string; Customer_address: string; Customer_phone: string; Customer_email: string; };
        Old_Meter_info: { Meter_id: string; Meter_type: string; Meter_kwh: string; Meter_kvah: string; Meter_status: string; };
    }[]>([]);

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get('http://192.168.1.69:5000/getmi');
                setRequests(response.data);
            } catch (error) {
                console.error('Error fetching requests:', error);
            }
        };

        fetchRequests();
    }, []);


    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.dateText}>{`${formattedDate}`}</Text>
                        <Text style={styles.timeText}>Today at {formattedTime}</Text>
                    </View>

                    <View style={styles.row}>
                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>Allocated</Text>
                            <Text style={styles.cardValue}>{allocatedJobs}</Text>
                        </View>
                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>Completed</Text>
                            <Text style={styles.cardValue}>{completedJobs}</Text>
                        </View>
                    </View>

                    <View style={styles.infoCard}>
                        <Text style={styles.infoTitle}>Today Visit</Text>
                        <Text style={styles.infoValue}>0</Text>
                    </View>
                    <View style={styles.infoCard}>
                        <Text style={styles.infoTitle}>Total Visit</Text>
                        <Text style={styles.infoValue}>0</Text>
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

                    <Text style={styles.version}>App Version: Beta 2.0.3</Text>
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
      
        chartContainer: { backgroundColor: "#fff", padding: 15, borderRadius: 10, marginVertical: 10, elevation: 5 },
        chartTitle: { textAlign: "center", fontSize: 16, fontWeight: "bold", marginBottom: 10 },
        legend: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
      
        version: { textAlign: "center", fontSize: 14, color: "gray", marginTop: 20 },

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