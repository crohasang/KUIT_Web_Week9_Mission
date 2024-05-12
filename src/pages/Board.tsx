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
    queryKey: ['fetchCardData'],
    queryFn: () => fetchCardData(),
  });

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
        {cardData !== undefined && <CardArea CardData={cardData} />}
      </div>
      <DarkModeToggle />
      <TopButton />
    </div>
  );
};

export default Board;
