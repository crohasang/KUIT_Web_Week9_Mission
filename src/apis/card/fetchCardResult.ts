import instance from '../instance';
import { CardResult } from '../../store/type/card/card';

// 카드 데이터 조회 API
export const fetchCardData = async () => {
  const response = await instance.get<CardResult[]>(
    // 더미데이터
    '/result'

    // 실제 연결
  );
  console.log(response);
  return response.data;
};
