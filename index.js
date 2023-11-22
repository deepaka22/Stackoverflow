import express from "express";
import { studentsRouter } from "./Routes/student.js";
import { userRouter } from "./Routes/user.js";
import { isAuthenticated } from "./Authentication/userAuth.js";

import dotenv from "dotenv";

const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server started in local hosts ${PORT}`);
});

// middle ware..
app.use(express.json());
// Router
app.use("/students", isAuthenticated, studentsRouter);
app.use("/users", userRouter);
