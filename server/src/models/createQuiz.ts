import { supabase } from "../supabase";

export const quiz = async (quizData: any) => {
  return await supabase.from("quizzes").insert(quizData);
};

export const getQuiz = async (status: string) => {
  return await supabase.from("quizzes").select("*").eq("status", status);
};

export const updateQuizById = async (quizId: string, quizData: any) => {
  return await supabase.from("quizzes").update(quizData).eq("id", quizId);
};
