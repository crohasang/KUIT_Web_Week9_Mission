import BoardIntroduce from '../components/organisms/BoardIntroduce';
import BoardFilterLine from '../components/organisms/BoardFilterLine';
import DarkModeToggle from '../components/atoms/DarkModeToggle';

import TopButton from '../components/atoms/TopButton';
import { useQuery } from '@tanstack/react-query';
import { fetchCardData } from '../apis/card/fetchCardResult';
import Loading from './Loading';
import CardArea from '../components/organisms/CardArea';
import SearchHeader from '../components/organisms/Appbar';

const Board = () => {
  // fetchCardResult

  const { data: cardData, isLoading: isCardDataLoading } = useQuery({
    // 캐시에서 데이터를 찾는 데 사용됨
    // 같은 queryKey를 가지고 있으면 같은 캐시 데이터를 공유
    // queryKey가 변경될 때마다 refetching이 일어남

    queryKey: ['fetchCardData'],

    // 쿼리 함수를 설정. 이 함수는 API 호출을 담당하며, 여기서는 fetchCardData 함수를 호출
    queryFn: () => fetchCardData(),
  });

  // 데이터가 로딩 중이면 <Loading /> 리턴
  if (isCardDataLoading) {
    return <Loading />;
  }

  return (
    <div className="font-pretendard min-h-screen w-screen bg-white dark:bg-zinc-700 flex flex-col">
      <SearchHeader />
      <div className="h-64  flex-shrink-0">
        <BoardIntroduce />
      </div>
      <div className="px-8">
        <div>
          <BoardFilterLine />
        </div>
        <hr className="border-gray-300 dark:border-white" />

        {/* cardData를 CardArea에 전달 */}
        {cardData !== undefined && <CardArea CardData={cardData} />}
      </div>
      <DarkModeToggle />
      <TopButton />
    </div>
  );
};

export default Board;
