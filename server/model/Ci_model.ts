import { Schema, model, Document } from 'mongoose';

interface Ici extends Document {
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
    }
}

const CiSchema = new Schema<Ici>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    Customer_info: {
        Customer_name: { type: String, required: true },
        Customer_address: { type: String, required: true },
        Customer_phone: { type: String, required: true },
        Customer_email: { type: String, required: true }
    },
    Old_Meter_info: {
        Meter_id: { type: String, required: true },
        Meter_type: { type: String, required: true },
        Meter_kwh: { type: String, required: true },
        Meter_kvah: { type: String, required: true },
        Meter_status: { type: String, required: true }
    }
});

const Ci = model<Ici>('Ci', CiSchema);

export default Ci;