import { supabase } from "../supabase";
import { Request, Response } from "express";

export async function verifyOtp(req: Request, res: Response) {
  const { phone, otp } = req.body;

  if (!otp) {
    return res.status(400).json({ message: "OTP is required." });
  }

  const { data, error } = await supabase.auth.verifyOtp({
    phone,
    token: otp,
    type: "sms",
  });
  if (error) {
    console.log("Error: ", error);
    return res.status(400).json({ message: error.message });
  }
  return res
    .status(200)
    .json({ message: "OTP verified.", token: data.session.access_token });
}
