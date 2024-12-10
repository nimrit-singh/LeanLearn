import { supabase } from "../supabase";
import { Request, Response } from "express";

export async function updateUser(req: Request, res: Response): Promise<void> {
  try {
    const { phone, token } = req.body;
    if (phone && token) {
      const { data, error } = await supabase
        .from("users")
        .update({ token })
        .match({ phone })
        .select();
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  return;
}
