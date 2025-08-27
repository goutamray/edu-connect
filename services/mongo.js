// import mongoose from "mongoose";

// export async function dbConnect() {
//   try {
//     const conn = await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

//     console.log(conn);

//     return conn;
//   } catch (err) {
//     console.error(err);
//   }
// }

import mongoose from "mongoose";

let isConnected = false;

export async function dbConnect() {
  if (isConnected) return;

  try {
    const db = await mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
      dbName: "educonnect",
    });

    isConnected = true;
    // console.log("MongoDB connected");
    return db;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("MongoDB connection failed");
  }
}
