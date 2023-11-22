// writting middle ware
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const isAuthenticated = (req, resp, next) => {
  const token = req.headers["x-auth-token"]; // x-auth-token is the key from the headers....
  console.log(token);
  if (!token) {
    return resp.status(404).json({ message: "invalid authorization" });
  }
  const decode = jwt.verify(token, process.env.SECRET_KEY);
  console.log(decode);
  next();
};
