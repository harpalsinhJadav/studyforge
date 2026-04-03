/** XP required to reach a given level */
export function xpForLevel(level: number): number {
  return level * level * 100;
}

/** Derive level from total XP */
export function levelFromXp(xp: number): number {
  return Math.floor(Math.sqrt(xp / 100));
}

/** XP earned for a quiz attempt based on score and difficulty multiplier */
export function calculateQuizXp(
  score: number,
  questionCount: number,
  difficultyMultiplier: number,
): number {
  return Math.round((score / 100) * questionCount * 10 * difficultyMultiplier);
}

export const DIFFICULTY_MULTIPLIER: Record<string, number> = {
  basic: 1,
  medium: 1.5,
  advanced: 2,
  pro: 3,
};
