import dotenv from 'dotenv';
import app from './app.js';
import { connectDB } from './config/db.js';

dotenv.config();

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB();
        app.listen(port, () => {
            console.log(`Server is running on : ${port}`);
        });
    } catch (err) {
        console.error('Failed to start server:', err.message || err);
        process.exit(1);
    }
};

start();

