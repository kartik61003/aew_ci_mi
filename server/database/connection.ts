import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connection = async () => {
    const url = process.env.DATABASE_URL;
    if (!url) {
        throw new Error('DATABASE_URL is not defined');
    }
    try {
        await mongoose.connect(url);
        console.log('Database connection established');
    } catch (err) {
        console.log(`Error while connecting to database: ${err}`);
    }
};

export default connection;