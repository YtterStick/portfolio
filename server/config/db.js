const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        if (error.code === 'ECONNREFUSED') {
            console.error('Note: This is often a DNS or network problem. Check if your network blocks SRV records.');
        }
        console.error(error);
        console.warn('Continuing without a MongoDB connection so the server can still start.');
    }
};

module.exports = connectDB;
