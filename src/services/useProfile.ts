import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMyProfile, createProfile } from './api';
import { queryKeys } from './queryKeys';

export const useMyProfile = () => {
  return useQuery({
    queryKey: queryKeys.profile.me,
    queryFn: getMyProfile,
  });
};

export const useCreateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (username: string) => createProfile(username),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.profile.me });
    },
  });
};
