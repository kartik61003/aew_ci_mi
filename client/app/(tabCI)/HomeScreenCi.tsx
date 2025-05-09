import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface RequestCardProps {
    request: {
        _id: string;
        user: {
            _id: string;
            username: string;
            email: string;
            phone: string;
        };
        Customer_info: {
            Customer_name: string;
            Customer_address: string;
            Customer_phone: string;
            Customer_email: string;
        };
        Old_Meter_info: {
            Meter_id: string;
            Meter_type: string;
            Meter_kwh: string;
            Meter_kvah: string;
            Meter_status: string;
        };
    };
}

const RequestCard: React.FC<RequestCardProps> = ({ request }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    return (
        <View style={styles.card}>
            <TouchableOpacity onPress={toggleExpand} style={styles.header}>
                <Text style={styles.headerText}>{request.Customer_info.Customer_name}</Text>
                <FontAwesome name={expanded ? 'chevron-up' : 'chevron-down'} size={24} color="black" />
            </TouchableOpacity>
            {expanded && (
                <View style={styles.content}>
                    <Text style={styles.label}>Customer Address: {request.Customer_info.Customer_address}</Text>
                    <Text style={styles.label}>Customer Phone: {request.Customer_info.Customer_phone}</Text>
                    <Text style={styles.label}>Customer Email: {request.Customer_info.Customer_email}</Text>
                    <Text style={styles.label}>Old Meter ID: {request.Old_Meter_info.Meter_id}</Text>
                    <Text style={styles.label}>Old Meter Type: {request.Old_Meter_info.Meter_type}</Text>
                    <Text style={styles.label}>Old Meter kWh: {request.Old_Meter_info.Meter_kwh}</Text>
                    <Text style={styles.label}>Old Meter kVah: {request.Old_Meter_info.Meter_kvah}</Text>
                    <Text style={styles.label}>Old Meter Status: {request.Old_Meter_info.Meter_status}</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={() => console.log('Button pressed')}>
                            <Text style={styles.buttonText}>Mark as Done</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={() => console.log('Button pressed')}>
                            <Text style={styles.buttonText}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 2,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    content: {
        marginTop: 10,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#555',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    button: {
        flex: 1,
        backgroundColor: 'orange',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default RequestCard;