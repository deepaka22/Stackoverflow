import { client } from "../db.js";
import { ObjectId } from "mongodb";
// import obj from "mongodb";

export const studentsData = (req) => {
  return client
    .db("Authentication")
    .collection("studentData")
    .find(req)
    .toArray();
};

export const newstudentsData = (id) => {
  return client
    .db("Authentication")
    .collection("studentData")
    .find({ _id: new ObjectId(id) })
    .toArray();
};

export const postnewStudents = (data) => {
  return client.db("Authentication").collection("studentData").insertOne(data);
};

export const editStudents = (params, bodyMsg) => {
  return client
    .db("Authentication")
    .collection("studentData")
    .findOneAndUpdate({ _id: new ObjectId(params) }, { $set: bodyMsg });
};

export const deleteStudents = (id) => {
  return client
    .db("Authentication")
    .collection("studentData")
    .deleteOne({ _id: new ObjectId(id) });
};
export var object = ObjectId;
// console.log(object);
