import { MCQQuestion, FillQuestion, TFQuestion, FormulaQuestion } from '../../types/quizInterface';

const BASE_URL = 'https://lean-learn-backend-ai-ex3e.onrender.com';

export const aiApi = {
  explainAnswer: async (data: {
    question: string;
    topic: string;
    answer: string |{
      name: string;
      symbol: string;
  }[];
    chosen_answer: string;
  }): Promise<string> => {
    try {
      const requestBody = {
        question: data.question,
        topic: data.topic,
        answer: data.answer,
        choosen_answer: data.chosen_answer 
      };

      console.log('Sending request with data:', requestBody);

      const response = await fetch(`${BASE_URL}/ai/explain`, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      console.log('Raw response:', response);

      const responseText = await response.text();
      console.log('Response text:', responseText);

      let result;
      try {
        result = JSON.parse(responseText);
      } catch (e) {
        console.error('Failed to parse response as JSON:', e);
        return responseText || 'Failed to get explanation';
      }

      console.log('Parsed response:', result);

      if (!response.ok) {
        console.error('API Error:', result);
        throw new Error(JSON.stringify(result));
      }

      return result.explanation || result.message || result || 'No explanation available';

    } catch (error) {
      console.error('Error in explainAnswer:', error);
      throw error;
    }
  }
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
  delete: async (id: string): Promise<void> => {
    try {
      const response = await fetch(`${BASE_URL}/mcqquestion/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (!response.ok) throw new Error('Failed to delete MCQ question');
    } catch (error) {
      console.error('Error deleting MCQ question:', error);
      throw error;
    }
  }
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
  delete: async (id: string): Promise<void> => {
    try {
      const response = await fetch(`${BASE_URL}/fillquestion/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (!response.ok) throw new Error('Failed to delete fill-in question');
    } catch (error) {
      console.error('Error deleting fill-in question:', error);
      throw error;
    }
  }
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
  delete: async (id: string): Promise<void> => {
    try {
      const response = await fetch(`${BASE_URL}/tfquestion/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (!response.ok) throw new Error('Failed to delete True/False question');
    } catch (error) {
      console.error('Error deleting True/False question:', error);
      throw error;
    }
  }
};
export const formulaQuestionApi = {
  getAll: async (): Promise<FormulaQuestion[]> => {
    try {
      const response = await fetch(`${BASE_URL}/formula/`);
      if (!response.ok) throw new Error('Failed to fetch formula questions');
      return response.json();
    } catch (error) {
      console.error('Error fetching formula questions:', error);
      throw error;
    }
  },

  create: async (question: {
    id: string;
    class_: string;
    subject: string;
    topic: string;
    question: string;
    quantities: Array<{
      name: string;
      symbol: string;
      isUnknown?: boolean;
    }>;
    formula: Array<{
      name: string;
      symbol: string;
    }>;
    options: string[];
    answers: string[];
    resource: string[];
    used: boolean;
  }) => {
    try {
      const response = await fetch(`${BASE_URL}/formula/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(question)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create formula question: ${errorText}`);
      }
      
      return response.json();
    } catch (error) {
      console.error('Error details:', error);
      throw error;
    }
  },update: async (id: string, question: FormulaQuestion): Promise<FormulaQuestion> => {
    try {
      const response = await fetch(`${BASE_URL}/formula/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(question),
      });
      if (!response.ok) throw new Error('Failed to update Formula question');
      return response.json();
    } catch (error) {
      console.error('Error updating Formula question:', error);
      throw error;
    }
  },
  delete: async (id: string): Promise<void> => {
    try {
      const response = await fetch(`${BASE_URL}/formula/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (!response.ok) throw new Error('Failed to delete formula question');
    } catch (error) {
      console.error('Error deleting formula question:', error);
      throw error;
    }
  }
};