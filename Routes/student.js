import express from "express";
import {
  editStudents,
  studentsData,
  newstudentsData,
  postnewStudents,
  deleteStudents,
} from "../dbcontoller/controller.js";

const router = express.Router();

// get all students data by request query...

router.get("/all", async (req, resp) => {
  try {
    // request from query  ?=
    const requestquery = req.query;

    const students = await studentsData(requestquery);
    console.log(requestquery);

    if (!students.length === 0) {
      return resp.status(400).json({ message: "No data available" });
    }

    resp.status(200).json({ students_data: students });
  } catch (error) {
    resp.status(500).json(error, { error, message: "internal server error" });
  }
});

router.get("/respstu/:id", async (req, resp) => {
  try {
    const { id } = req.params;

    const newStudent = await newstudentsData(id);

    if (newStudent.length === 0) {
      resp.status(400).json({ message: "no data available" });
    }
    resp.status(200).json({ data: newStudent });
  } catch (error) {
    resp.status(500).json({ message: "internal server error" });
  }
});

router.post("/new", async (req, resp) => {
  try {
    const result = req.body;
    console.log(result);
    // if there is no data provided on the req.body
    if (!result) {
      return resp.json({ message: "no data provided" });
    }

    const newstudents = await postnewStudents(result);

    if (!newstudents) {
      return resp.json({ message: "error in data posting" });
    }

    resp.status(201).json({ data: newstudents });
  } catch (error) {
    return resp.status(500).json({ message: "internal server error", error });
  }
});

router.put("/edit/:params", async (req, resp) => {
  try {
    const { params } = req.params;
    const bodyMsg = req.body;

    if (!params || !bodyMsg) {
      resp.json({ message: "no Data was recieved to update" });
    }

    const updateStud = await editStudents(params, bodyMsg);

    resp.json({ data: updateStud });
  } catch (error) {
    return resp.status(500).json({ message: "internal server error", error });
  }
});

router.delete("/delete/:id", async (req, resp) => {
  try {
    const { id } = req.params;
    console.log(id);

    if (!id) {
      resp.status({ message: "provide valid information" });
    }
    const deletedData = await deleteStudents(id);

    resp.json({ data: deletedData });
  } catch (error) {
    return resp.json({ message: "internal server error", error });
  }
});

export const studentsRouter = router;

// password / LiP248jtag9q7CCD
// us name / deepakbakyalakshmi1997
