import mongoose from 'mongoose';
import { config } from 'dotenv';

config()

const connectDb = async () => {
    try {
        const username = encodeURIComponent(process.env.DB_USERNAME!);
        const password = encodeURIComponent(process.env.DB_PASSWORD!);
        const dbName = process.env.DB_NAME

        mongoose.set("strictQuery", false);
        mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.wttu2.mongodb.net/${dbName}`)
            .then((result) => {
                console.log('db connected');
            })
            .catch((error) => {
                console.log(error);
            });
    } catch (e) {
        console.log(e);
    }
}

export default connectDb