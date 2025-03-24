import axios from "axios";

export interface ciData {
    user: {
        _id: string;
        username: string;
        phone: string;
        email: string;
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
}

export interface request_Id {
    requestId: string;
}

export const createCi = async (data: ciData) => {
    try {
        const response = await axios.post('http://192.168.1.69:5000/ci', data);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const markdone = async (data: request_Id) => {
    try {
        const response = await axios.post('http://192.168.1.69:5000/markdone', data); 
        response.data;
    }
    catch (error) {
        throw error;
    }
}