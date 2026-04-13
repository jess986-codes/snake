export interface Direction {
  x: number;
  y: number;
}

export interface GameScore {
  id: number;
  userId: number;
  score: number;
  gameDate: string;
}

export interface GameScoreRequest {
  score: number;
}

export interface LeaderboardEntry {
  rank: number;
  user: {
    id: number;
    username: string;
  };
  topScore: number;
  totalGamesPlayed: number;
}

export interface GameState {
  score: number;
  gameOver: boolean;
  isPlaying: boolean;
  direction: Direction;
}
