import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CardResult } from '../../store/type/card/card';
import instance from '../instance';

const useContentSubmitMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newData: CardResult) => {
      return await instance.post('/result', newData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fetchCardData'] });
    },
  });

  return mutation;
};

export default useContentSubmitMutation;
