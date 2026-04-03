export type Difficulty = 'basic' | 'medium' | 'advanced' | 'pro';
export type QuestionType = 'mcq' | 'true_false' | 'fill_blank';

export interface QuizConfig {
  materialId?: string;
  topicText?: string;
  chapterIds?: string[];
  difficulty: Difficulty;
  questionCount: number;
  questionTypes: QuestionType[];
}

export interface QuizQuestion {
  id: string;
  text: string;
  type: QuestionType;
  options?: string[];          // MCQ: A/B/C/D
  correctAnswer: string;
  explanation: string;
  chapterRef?: string;
}

export interface Quiz {
  id: string;
  userId: string;
  materialId?: string;
  topicText?: string;
  difficulty: Difficulty;
  questions: QuizQuestion[];
  createdAt: string;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  userId: string;
  answers: Record<string, string>;   // questionId → answer
  score: number;                      // 0–100 %
  xpEarned: number;
  timeTakenSeconds: number;
  completedAt: string;
}

export interface QuizResult {
  attempt: QuizAttempt;
  correct: number;
  wrong: number;
  weakTopics: string[];
}
