import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTopScores, getMyBestScore, submitScore } from './api';
import { queryKeys } from './queryKeys';

export const useTopScores = () => {
  return useQuery({
    queryKey: queryKeys.leaderboard.top,
    queryFn: getTopScores,
  });
};

export const useMyBestScore = () => {
  return useQuery({
    queryKey: queryKeys.leaderboard.me,
    queryFn: getMyBestScore,
  });
};

export const useSubmitScore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (score: number) => submitScore(score),
    onSuccess: () => {
      // Refetch leaderboard and personal best after submitting
      queryClient.invalidateQueries({ queryKey: queryKeys.leaderboard.top });
      queryClient.invalidateQueries({ queryKey: queryKeys.leaderboard.me });
    },
  });
};
