import { supabase } from "../supabase";
import { Request, Response } from "express";

export async function login(req: Request, res: Response) {
  try {
    const { phone } = req.body;
    if (!phone) {
      return res.status(400).json({ message: "Phone is required." });
    }

    const { data, error } = await supabase.auth.signInWithOtp({
      phone,
      options: {
        shouldCreateUser: false,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  return res.status(200).json({ message: "OTP sent to mobile." });
}
