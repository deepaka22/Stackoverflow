import express from "express";
import bcrypt from "bcrypt";
import {
  addUser,
  findUser,
  generateToken,
} from "../dbcontoller/userController.js";

const router = express.Router();

router.post("/signup", async (req, resp) => {
  try {
    const result = req.body; // data got from req.body
    const findingUser = await findUser(result.email); // since email is unique, we check whether user is aldreay in
    if (!findingUser) {
      // if there is nothing cannot be found
      const salt = await bcrypt.genSalt(10); // salt value will be generated (1-10)
      const hashedPass = await bcrypt.hash(req.body.password, salt); // hashing the password + salt value
      const userdata = await { ...req.body, password: hashedPass }; // {complete req.body, and in that password has the hashedpass}
      const dbinfo = await addUser(userdata); //sharing the info to db (saltv + hashed pass = new pass)
      return resp.status(201).json(dbinfo);
    }
    return resp.status(400).json({ message: "email adready exists" });
  } catch (error) {
    return resp.status(500).json({ message: "internal server error", error });
  }
});

router.post("/login", async (req, resp) => {
  try {
    const result = req.body;
    //1. user aldready exists or not // if email is validate and cannot locate an email...
    const emailValidataion = await findUser(result.email);

    if (!emailValidataion) {
      return resp.json({ message: "Invalid Email" });
    }
    //2 Password validation : need to check or match the password... if password is incorrect...

    const passwordValidation = await bcrypt.compare(
      result.password,
      emailValidataion.password
    );

    if (!passwordValidation) {
      return resp.json({ message: "Invalid Password" });
    }

    const token = await generateToken(emailValidataion._id);
    console.log(token, "from router");
    return resp
      .status(201)
      .json({ data: result, token: token, dataresponse: "sucess" });
  } catch (error) {
    return resp.status(500).json({ message: "internal server error", error });
  }
});

export const userRouter = router;
