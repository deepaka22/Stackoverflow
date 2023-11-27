import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import {
  addUser,
  findUser,
  generateToken,
  forgetPassword,
  ResetPassword,
} from "../dbcontoller/userController.js";

import nodemailer from "nodemailer";

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

router.post("/forgotPassword", async (req, resp) => {
  try {
    const result = req.body;

    const findingUser = await findUser(result.email); // since email is unique, we check whether user is aldreay in
    console.log(findingUser, "yes");
    if (!findingUser) {
      resp.status(400).json({ message: "email id does not exists" });
    }

    const token = await forgetPassword(findingUser._id);

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USERID,
        pass: process.env.PASSWORD,
      },
    });

    var mailOptions = {
      from: process.env.USERID,
      to: findingUser.email,
      subject: "Reset to your password",
      text:
        `http://localhost:3000/users/passwordReset/${findingUser._id}/${token}` +
        "Password needs to be Changed in 24 Hours",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response); // return resp.send({ message: "success" });
      }
    });
    resp.json({ message: "Mail sent" });
  } catch (error) {
    resp.json({ message: "invalid response or error resetting password" });
  }
});

router.post("/passwordReset/:id/:token", async (req, resp) => {
  try {
    const { id, token } = req.params;
    const recievedPassword = req.body;

<<<<<<< HEAD
    console.log(id, token, recievedPassword);
=======
  console.log(id, token, recievedPassword);

  const isValid = jwt.verify(token, process.env.SECRET_KEY);
  console.log(isValid);
>>>>>>> 3050d917b1f3ee46d09721458104fa70c288f6df

    const isValid = jwt.verify(token, process.env.SECRET_KEY);
    console.log(isValid);

    if (!isValid) {
      resp.status(201).json({ Message: "invalid token" });
    }

    const salt = await bcrypt.genSalt(10); // salt value will be generated (1-10)
    const hashedPass = await bcrypt.hash(recievedPassword.password, salt); // hashing the password + salt value
    const userdata = { password: hashedPass }; // {complete req.body, and in that password has the hashedpass}
    const dbinfo = await ResetPassword(id, userdata); //sharing the info to db (saltv + hashed pass = new pass)

    return resp.status(201).json({ message: "password Changed successfully" });
  } catch (error) {
    return resp.json({ message: "internal server Error" }, error);
  }
<<<<<<< HEAD
=======

  const salt = await bcrypt.genSalt(10); // salt value will be generated (1-10)
  const hashedPass = await bcrypt.hash(recievedPassword.password, salt); // hashing the password + salt value
  const userdata = { password: hashedPass }; // {complete req.body, and in that password has the hashedpass}
  const dbinfo = await ResetPassword(id, userdata); //sharing the info to db (saltv + hashed pass = new pass)

  return resp.status(201).json({ message: "password Changed successfully" });
>>>>>>> 3050d917b1f3ee46d09721458104fa70c288f6df
});
export const userRouter = router;
