import mongoose from 'mongoose';
import 'dotenv/config';

const globalObject = typeof global !== 'undefined' ? global : {};
let cached = globalObject.mongoose;

if (!cached) {
  cached = globalObject.mongoose = { conn: null, promise: null };
}

const clientOptions = {
  serverApi: { version: '1', strict: true, deprecationErrors: true },
};

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(`${process.env.MONGODB_URI}/neurosphere`, clientOptions)
      .then((mongoose) => {
        return mongoose;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
