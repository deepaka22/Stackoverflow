import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const mongodbConnectString = process.env.MONGODB_URL;
// "mongodb+srv://Newuser_31:deepak123@cluster0.5j3sk5w.mongodb.net/?retryWrites=true&w=majority";

export const dbconnection = async () => {
  const client = new MongoClient(mongodbConnectString);
  await client.connect();
  console.log("db connected successfuly");
  return client;
};

export const client = await dbconnection();
