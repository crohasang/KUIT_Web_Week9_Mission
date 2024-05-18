import BoardIntroduce from '../components/organisms/BoardIntroduce';
import BoardFilterLine from '../components/organisms/BoardFilterLine';
import DarkModeToggle from '../components/atoms/DarkModeToggle';

import TopButton from '../components/atoms/TopButton';

import Loading from './Loading';
import CardArea from '../components/organisms/CardArea';
import SearchHeader from '../components/organisms/Appbar';
import { useFeedsDataQuery } from '../apis/card/fetchFeedsData';

const Board = () => {
  // GET
  const { feedsData, isFeedsDataLoading } = useFeedsDataQuery();

  // 데이터가 로딩 중이면 <Loading /> 리턴
  if (isFeedsDataLoading) {
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
        {feedsData !== undefined && <CardArea CardData={feedsData} />}
      </div>
      <DarkModeToggle />
      <TopButton />
    </div>
  );
};

export default Board;
