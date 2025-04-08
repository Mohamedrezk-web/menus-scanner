import mongoose from 'mongoose';
import { GridFSBucket } from 'mongodb';

let bucket;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const conn = mongoose.connection;
    bucket = new GridFSBucket(conn.db, {
      bucketName: 'images',
    });

    console.log('MongoDB connected with GridFS initialized');
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exit(1);
  }
};

export { connectDB, bucket };
