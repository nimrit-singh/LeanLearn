import { supabase } from "../supabase";

export async function addUser(name, userType, phone) {
  const { data, error } = await supabase
    .from("users")
    .insert({
      name,
      user_type: userType,
      phone,
    })
    .select();

  if (error) {
    console.error("Error adding user:", error);
    throw new Error("Database error");
  }

  return data;
}
