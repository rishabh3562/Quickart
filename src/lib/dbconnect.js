import mongoose from 'mongoose';


const connection = {};

async function dbConnect() {
    // Check if we have a connection to the database or if it's currently connecting
    if (connection.isConnected) {
        // console.log('Already connected to the database');
        return connection;
    }

    try {
        // Attempt to connect to the database
        const db = await mongoose.connect(process.env.MONGODB_URI || '', {});

        connection.isConnected = db.connections[0].readyState;

        // console.log('Database connected successfully');
        return connection;
    } catch (error) {
        // console.error('Database connection failed:', error);


        process.exit(1);
    }
}

export default dbConnect;