import { Request, Response } from "express";
import { addUser } from "../models/addUser";
import { addTeachersInfo } from "../models/addTeachersInfo";
import { addStudentsInfo } from "../models/addStudentsInfo";

export async function addUsers(req: Request, res: Response): Promise<void> {
  const {
    name,
    userType,
    phone,
    city,
    subjects,
    school,
    studies,
    date_of_birth,
  } = req.body;

  if (!name || !userType || !phone) {
    return res
      .status(400)
      .json({ message: "name, userType, and phone are required." });
  }
  const user = await addUser(name, userType, phone);
  console.log(user);
  const user_id = user[0].id;

  if (userType === "teacher" && city && subjects && school) {
    const { city, subjects, school } = req.body;
    const teacher = await addTeachersInfo(city, subjects, school, user_id);
    console.log(teacher);
  } else if (userType === "teacher" && (!city || !subjects || !school)) {
    return res
      .status(400)
      .json({ message: "city, subject, school are required." });
  }

  if (
    userType === "student" &&
    studies &&
    subjects &&
    school &&
    city &&
    date_of_birth
  ) {
    const { studies, subjects, school, city, date_of_birth } = req.body;
    const student = await addStudentsInfo(
      studies,
      subjects,
      school,
      city,
      date_of_birth,
      user_id
    );
    console.log(student);
  } else if (
    userType === "student" &&
    (!studies || !subjects || !school || !city || !date_of_birth)
  ) {
    return res.status(400).json({
      message: "studies, subjects, school, city, dateOfBirth are required.",
    });
  }
  return;
}
