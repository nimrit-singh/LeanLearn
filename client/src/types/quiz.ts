export interface BaseQuestion {
    id: string;
    question: string;
    used: boolean;
  }
  
  export interface MCQQuestion extends BaseQuestion {
    options: string[];
    answers: string[];
  }
  
  export interface FillQuestion extends BaseQuestion {
    choices: string[];
    answers: string[];
  }
  
  export interface TFQuestion extends BaseQuestion {
    answer: string;
  }
  
  export interface QuestionResponse {
    correct: boolean;
    answer: string;
  }