import { QuestionType } from "@/types/quizTypes";
import { FormulaQuestion,MCQQuestion,FillQuestion,TFQuestion } from "@/types/quizInterface";
export const isValidOption = (option: string): boolean => {
    return option !== "d" && option.trim().length > 0;
  };

 export const isFormulaQuestion = (
    question: QuestionType
  ): question is FormulaQuestion => {
    return "formula" in question;
  };

 export const isMCQQuestion = (question: QuestionType): question is MCQQuestion => {
    return "options" in question && !("formula" in question);
  };

 export const isFillQuestion = (question: QuestionType): question is FillQuestion => {
    return "choices" in question;
  };

 export const isTFQuestion = (question: QuestionType): question is TFQuestion => {
    return (
      !("options" in question) &&
      !("choices" in question) &&
      "answer" in question
    );
  };