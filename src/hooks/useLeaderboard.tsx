import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../services/queryKeys';
import { getTopScores } from '../services/api';


export const useTopScores = () => {
  return useQuery({
    queryKey: queryKeys.leaderboard.top,
    queryFn: getTopScores,
  });
};
