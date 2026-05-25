import { getToken } from './auth';

export interface LeaderboardEntry {
  id: string;
  userId: string;
  username: string;
  topScore: number;
  achievedAt: string;
}

export interface Profile {
  id: string;
  username: string;
}

const BASE_URL =
  import.meta.env.VITE_SNAKE_API_BASE_URL ?? 'http://localhost:8080';

const authHeaders = async (): Promise<HeadersInit> => {
  const token = await getToken();

  console.log(`my token is: ${token}`);

  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

export const submitScore = async (score: number): Promise<LeaderboardEntry> => {
  const response = await fetch(`${BASE_URL}/api/leaderboard/submit`, {
    method: 'POST',
    headers: await authHeaders(),
    body: JSON.stringify({ score }),
  });
  return response.json();
};

export const getTopScores = async (): Promise<LeaderboardEntry[]> => {
  const response = await fetch(`${BASE_URL}/api/leaderboard/`);
  console.log(response);
  return response.json();
};

export const getMyBestScore = async (): Promise<LeaderboardEntry> => {
  const response = await fetch(`${BASE_URL}/api/leaderboard/me`, {
    headers: await authHeaders(),
  });
  return response.json();
};

export const createProfile = async (username: string): Promise<Profile> => {
  console.log('creating profile');
  const response = await fetch(`${BASE_URL}/api/profile`, {
    method: 'POST',
    headers: await authHeaders(),
    body: JSON.stringify({ username }),
  });
  return response.json();
};

export const getMyProfile = async (): Promise<Profile> => {
  const response = await fetch(`${BASE_URL}/api/profile/me`, {
    headers: await authHeaders(),
  });
  return response.json();
};
