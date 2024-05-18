import instance from '../instance';
import { CardResult } from '../../store/type/card/card';
import { useQuery } from '@tanstack/react-query';

// 카드 데이터 조회 API
export const fetchFeedsData = async () => {
  const response = await instance.get<CardResult[]>(
    // 더미데이터
    '/result'

    // 실제 연결
  );
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
export const useFeedDataQuery = () => {};
