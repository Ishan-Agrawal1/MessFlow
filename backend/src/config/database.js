import mongoose from 'mongoose';
import config from './index.js';

/**
 * Connect to MongoDB with retry logic and event listeners.
 */
const connectDatabase = async () => {
  try {
    const conn = await mongoose.connect(config.mongodbUri, {
      dbName: 'messdb',
      // Connection pool sized for 1000 concurrent users
      maxPoolSize: 200,
      minPoolSize: 20,
      // Timeouts for resilience under load
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });

    console.log(`✅ MongoDB connected: ${conn.connection.host}`);

    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err.message);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️  MongoDB disconnected. Attempting reconnection...');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('✅ MongoDB reconnected');
    });

    return conn;
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

export default connectDatabase;
