import { supabase } from "../supabase";
import { Request, Response } from "express";

export async function signup(req: Request, res: Response) {
  const { name, phone, userType } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ message: "Name and phone are required." });
  }

  const { data, error } = await supabase.auth.signUp({
    phone,
    password: "example-password",
    options: {
      channel: "sms",
    },
  });

  console.log("Data: ", data);
  console.log("Error: ", error);
  res.status(201).json({ message: "OTP sent to mobile." });
}
