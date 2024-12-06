import { supabase } from "../supabase";
import { Request, Response } from "express";

export async function authorize(req: Request, res: Response) {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);

  if (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  console.log("User: ", user);
  res.status(200).json({ message: "User Authorized" });
}
