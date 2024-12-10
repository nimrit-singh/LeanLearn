import { supabase } from "../supabase";

export async function addStudentsInfo(
  studies,
  subjects,
  school,
  city,
  date_of_birth,
  user_id
) {
  const { data, error } = await supabase
    .from("students")
    .insert({
      studies,
      subjects,
      school,
      city,
      date_of_birth,
      id: user_id,
    })
    .select();

  if (error) {
    console.error("Error adding user:", error);
    throw new Error("Database error");
  }
  return data;
}
