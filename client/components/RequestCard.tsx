import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import { markdone } from '@/service/ci';
import { router } from 'expo-router';

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
        request_status: string;
    };
    refreshRequests: () => void; // Receive refresh function
}

const RequestCard: React.FC<RequestCardProps> = ({ request, refreshRequests }) => {
    const [expanded, setExpanded] = useState(false);
    const [customerInfo, setCustomerInfo] = useState(request.Customer_info);
    const [oldMeterInfo, setOldMeterInfo] = useState(request.Old_Meter_info);
    const isEditable = request.request_status === 'pending';

    const handleInputChange = (field: string, value: string, type: 'customer' | 'meter') => {
        if (type === 'customer') {
            setCustomerInfo({ ...customerInfo, [field]: value });
        } else {
            setOldMeterInfo({ ...oldMeterInfo, [field]: value });
        }
    };
    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    const handleMarkDone = async () => {
        try {
            const updatedRequest = {
                ...request,
                Customer_info: customerInfo,
                Old_Meter_info: oldMeterInfo,
                request_status: 'completed',
            }
            await markdone(updatedRequest); // Call API to update status
            refreshRequests(); // Refresh data after updating
        } catch (error) {
            console.error("Error marking request as done:", error);
        }
    };

    const cardBackgroundColor = request.request_status === 'pending' ? 'maroon' : 'darkgreen';

    return (
        <View style={[styles.card, { backgroundColor: cardBackgroundColor }]}>
            <TouchableOpacity onPress={toggleExpand} style={styles.header}>
                <Text style={styles.headerText}>{request.Customer_info.Customer_name}</Text>
                <FontAwesome name={expanded ? 'chevron-up' : 'chevron-down'} size={24} color="black" />
            </TouchableOpacity>
            {expanded && (
                <View style={styles.content}>
                    <Text style={styles.label}>Customer Name:</Text>
                    <TextInput 
                        style={styles.input} 
                        value={customerInfo.Customer_name} 
                        onChangeText={(value) => handleInputChange('Customer_name', value, 'customer')} 
                        editable={isEditable} 
                    />

                    <Text style={styles.label}>Customer Address:</Text>
                    <TextInput 
                        style={styles.input} 
                        value={customerInfo.Customer_address} 
                        onChangeText={(value) => handleInputChange('Customer_address', value, 'customer')} 
                        editable={isEditable} 
                    />

                    <Text style={styles.label}>Customer Phone:</Text>
                    <TextInput 
                        style={styles.input} 
                        value={customerInfo.Customer_phone} 
                        onChangeText={(value) => handleInputChange('Customer_phone', value, 'customer')} 
                        editable={isEditable} 
                        keyboardType="phone-pad"
                    />

                    <Text style={styles.label}>Old Meter ID:</Text>
                    <TextInput 
                        style={styles.input} 
                        value={oldMeterInfo.Meter_id} 
                        onChangeText={(value) => handleInputChange('Meter_id', value, 'meter')} 
                        editable={isEditable} 
                    />

                    <Text style={styles.label}>Old Meter Type:</Text>
                    <TextInput 
                        style={styles.input} 
                        value={oldMeterInfo.Meter_type} 
                        onChangeText={(value) => handleInputChange('Meter_type', value, 'meter')} 
                        editable={isEditable} 
                    />

                    <Text style={styles.label}>Request Status: {request.request_status}</Text>

                    {isEditable && (
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={handleMarkDone}>
                                <Text style={styles.buttonText}>Mark as Done</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
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
        color: 'white',
    },
    content: {
        marginTop: 10,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: 'white'
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
    input: {
        height: 40,
        marginBottom: 10,
        paddingHorizontal: 5,
        borderRadius: 8,
        backgroundColor: '#fff',
    }
});

export default RequestCard;