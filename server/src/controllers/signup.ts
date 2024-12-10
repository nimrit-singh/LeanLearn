import { addUsers } from "../controllers/addUser";
import { supabase } from "../supabase";
import { NextFunction, Request, Response } from "express";

export async function signup(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, phone, userType } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ message: "Name and phone are required." });
    }
    const user = await addUsers(req, res);

    const { data, error } = await supabase.auth.signUp({
      phone,
      password: "example-password",
      options: {
        channel: "sms",
      },
    });
    console.log("Data: ", data);
    console.log("Error: ", error);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.status(201).json({ message: "OTP sent to mobile." });
  return;
}
