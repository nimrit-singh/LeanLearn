import { supabase } from "../supabase";

export async function addTeachersInfo(city, subjects, school, user_id) {
  const { data, error } = await supabase
    .from("teachers")
    .insert({
      city,
      subjects,
      school,
      id: user_id,
    })
    .select();

  if (error) {
    console.error("Error adding user:", error);
    throw new Error("Database error");
  }
  return data;
}
