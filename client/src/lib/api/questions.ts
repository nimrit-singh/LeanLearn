import { MCQQuestion, FillQuestion, TFQuestion } from '../../types/quiz';

const BASE_URL = 'https://lean-learn-backend-ai.onrender.com';

export const aiApi = {
  explainAnswer: async (data: {
    question: string;
    topic: string;
    answer: string;
    chosen_answer: string;
  }): Promise<string> => {
    try {
      const requestBody = {
        question: data.question,
        topic: data.topic,
        answer: data.answer,
        chosen_answer: data.chosen_answer
      };

      console.log('Request data:', JSON.stringify(requestBody, null, 2));

      const response = await fetch(`${BASE_URL}/ai/explain`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        throw new Error(JSON.stringify(errorData));
      }

      const result = await response.json();
      return result.explanation || result.text || '';

    } catch (error) {
      console.error('AI explanation error:', error);
      throw error;
    }
  },
};
export const mcqQuestionApi = {
  getAll: async (): Promise<MCQQuestion[]> => {
    try {
      const response = await fetch(`${BASE_URL}/mcqquestion/`);
      if (!response.ok) throw new Error('Failed to fetch MCQ questions');
      return response.json();
    } catch (error) {
      console.error('Error fetching MCQ questions:', error);
      throw error;
    }
  },

  getOne: async (id: string): Promise<MCQQuestion> => {
    try {
      const response = await fetch(`${BASE_URL}/mcqquestion/${id}`);
      if (!response.ok) throw new Error('Failed to fetch MCQ question');
      return response.json();
    } catch (error) {
      console.error('Error fetching MCQ question:', error);
      throw error;
    }
  },

  update: async (id: string, question: MCQQuestion): Promise<MCQQuestion> => {
    try {
      const response = await fetch(`${BASE_URL}/mcqquestion/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(question),
      });
      if (!response.ok) throw new Error('Failed to update MCQ question');
      return response.json();
    } catch (error) {
      console.error('Error updating MCQ question:', error);
      throw error;
    }
  },
};

export const fillQuestionApi = {
  getAll: async (): Promise<FillQuestion[]> => {
    try {
      const response = await fetch(`${BASE_URL}/fillquestion/`);
      if (!response.ok) throw new Error('Failed to fetch fill questions');
      return response.json();
    } catch (error) {
      console.error('Error fetching fill questions:', error);
      throw error;
    }
  },

  getOne: async (id: string): Promise<FillQuestion> => {
    try {
      const response = await fetch(`${BASE_URL}/fillquestion/${id}`);
      if (!response.ok) throw new Error('Failed to fetch fill question');
      return response.json();
    } catch (error) {
      console.error('Error fetching fill question:', error);
      throw error;
    }
  },

  update: async (id: string, question: FillQuestion): Promise<FillQuestion> => {
    try {
      const response = await fetch(`${BASE_URL}/fillquestion/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(question),
      });
      if (!response.ok) throw new Error('Failed to update fill question');
      return response.json();
    } catch (error) {
      console.error('Error updating fill question:', error);
      throw error;
    }
  },
};

export const tfQuestionApi = {
  getAll: async (): Promise<TFQuestion[]> => {
    try {
      const response = await fetch(`${BASE_URL}/tfquestion/`);
      if (!response.ok) throw new Error('Failed to fetch T/F questions');
      return response.json();
    } catch (error) {
      console.error('Error fetching T/F questions:', error);
      throw error;
    }
  },

  getOne: async (id: string): Promise<TFQuestion> => {
    try {
      const response = await fetch(`${BASE_URL}/tfquestion/${id}`);
      if (!response.ok) throw new Error('Failed to fetch T/F question');
      return response.json();
    } catch (error) {
      console.error('Error fetching T/F question:', error);
      throw error;
    }
  },

  update: async (id: string, question: TFQuestion): Promise<TFQuestion> => {
    try {
      const response = await fetch(`${BASE_URL}/tfquestion/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(question),
      });
      if (!response.ok) throw new Error('Failed to update T/F question');
      return response.json();
    } catch (error) {
      console.error('Error updating T/F question:', error);
      throw error;
    }
  },
};