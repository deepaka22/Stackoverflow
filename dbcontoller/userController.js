import { client } from "../db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ObjectId } from "mongodb";

dotenv.config();

export const addUser = (data) => {
  return client.db("Authentication").collection("userData").insertOne(data);
};

export const findUser = (email) => {
  return client
    .db("Authentication")
    .collection("userData")
    .findOne({ email: email });
};

export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: "30d" });
};

export const forgetPassword = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: "1d" });
};

export const ResetPassword = (id, data) => {
  return client
    .db("Authentication")
    .collection("userData")
    .findOneAndUpdate({ _id: new ObjectId(id) }, { $set: data });
};
//  deepakaguar
// pass : password123
