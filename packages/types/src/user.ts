export type Plan = 'free' | 'pro';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  plan: Plan;
  xp: number;
  level: number;
  streak: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserStats {
  quizzesTaken: number;
  streak: number;
  xp: number;
  badgeCount: number;
  leaderboardRank?: number;
}
