
export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number; // index
  explanation?: string;
}

export type RewardType = '1+' | '2+' | 'ALMOST' | 'LUCK' | 'NONE';

export interface UserInfo {
  fullName: string;
  className: string;
}

export interface GameState {
  user: UserInfo | null;
  currentStep: number;
  score: number;
  lives: number;
  isGameOver: boolean;
  isGameWon: boolean;
  selectedReward: RewardType | null;
  attemptsUsed: number;
}
