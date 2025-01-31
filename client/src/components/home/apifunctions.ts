import { MCQQuestion, TFQuestion, FillQuestion, FormulaQuestion } from "@/types/quizInterface";
import {
    mcqQuestionApi,
    fillQuestionApi,
    tfQuestionApi,
    formulaQuestionApi
} from "@/lib/api/questions";
import { QuestionType } from "@/types/quizTypes";
import { useState } from "react";
export const fetchQuestions = async () => {
    const [loading, setLoading] = useState(true);
    const [questions, setQuestions] = useState<QuestionType[]>([]);

    const [error, setError] = useState<string | null>(null);
    try {
        setLoading(true);
        const [mcqData, fillData, tfData, formulaData] = await Promise.all([
            mcqQuestionApi.getAll(),
            fillQuestionApi.getAll(),
            tfQuestionApi.getAll(),
            formulaQuestionApi.getAll(),
        ]);
        const transformedSelectedTopic = selectedTopic
            .replace(/\s+/g, "")
            .replace(/,/g, "")
            .toLowerCase();
        console.log(transformedSelectedTopic)

        const combinedQuestions: (MCQQuestion | FillQuestion | TFQuestion | FormulaQuestion)[] = [
            ...mcqData,
            ...fillData,
            ...tfData,
            ...formulaData,
        ].filter((q) => {
            if (!q || !q.class_ || !q.topic) return false;
            const classMatch =
                String(q.class_).trim() === String(selectedClass).trim();
            const topicMatch =
                String(q.topic).toLowerCase().trim() === transformedSelectedTopic;
            return classMatch && topicMatch;
        });

        if (combinedQuestions.length > 0) {
            const shuffledQuestions = combinedQuestions.sort(
                () => Math.random() - 0.5
            );
            setQuestions(shuffledQuestions);
        } else {
            setError(
                `No questions available for Class ${selectedClass} topic ${topicId}`
            );
        }
    } catch (err) {
        console.error("Error in fetchQuestions:", err);
        setError("Failed to load questions");
    } finally {
        setLoading(false);
    }
};