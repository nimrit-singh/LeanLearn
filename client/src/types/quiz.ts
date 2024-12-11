interface BaseQuestion {
  id: string;
  subject: string;
  topic: string;
  question: string;
  used: boolean;
}

export interface MCQQuestion extends BaseQuestion {
  options: string[];
  answers: string[];
  resource: string[];
}

export interface FillQuestion extends BaseQuestion {
  choices: string[];
  answers: string[];
  resource: string[];
}

export interface TFQuestion extends BaseQuestion {
  answer: string;
  resource: string;
}