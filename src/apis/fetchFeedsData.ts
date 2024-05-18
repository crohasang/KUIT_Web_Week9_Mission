import instance from './instance';
import { CardResult } from '../store/type/card';
import { useQuery } from '@tanstack/react-query';

// 피드들의 데이터 조회 API
export const fetchFeedsData = async () => {
  const response = await instance.get<CardResult[]>('/result');
  console.log(response);
  return response.data;
};

// 특정 피드의 데이터 조회 API
export const fetchFeedData = async (id: string) => {
  const response = await instance.get<CardResult>(`/result/${id}`);
  console.log(response);
  return response.data;
};

// 피드들의 데이터 GET
export const useFeedsDataQuery = () => {
  const { data: feedsData, isLoading: isFeedsDataLoading } = useQuery({
    queryKey: ['fetchFeedsData'],
    queryFn: () => fetchFeedsData(),
  });

  return { feedsData, isFeedsDataLoading };
};

// 특정 피드의 데이터 GET
export const useFeedDataQuery = (feedId: string) => {
  const { data: feedData, isLoading: isFeedDataLoading } = useQuery({
    queryKey: ['fetchFeedData', feedId],
    queryFn: () => fetchFeedData(feedId),
  });

  return { feedData, isFeedDataLoading };
};
