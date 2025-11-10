/* eslint-disable no-console */
import mongoose from 'mongoose';
import config from '../app/config';

// Type declaration for global mongoose cache
declare global {
  var mongooseCache: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

// Initialize cache
let cached = globalThis.mongooseCache;

if (!cached) {
  cached = globalThis.mongooseCache = {
    conn: null,
    promise: null,
  };
}

export const connectDB = async () => {
  // If we have a cached connection, return it
  if (cached.conn) {
    console.log('Using cached database connection');
    return cached.conn;
  }

  // If we don't have a cached promise, create one
  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Disable mongoose buffering for serverless
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    mongoose.set('strictQuery', false);

    cached.promise = mongoose
      .connect(config.database_uri as string, opts)
      .then((mongooseInstance) => {
        console.log('MongoDB connected successfully');
        return mongooseInstance;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('MongoDB connection error:', e);
    throw e;
  }

  return cached.conn;
};
