import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import instance from '../../apis/instance';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { CardResult } from '../../store/type/card/card';

interface Props {
  matchedCard: CardResult;
}

const LikesBtn: React.FC<Props> = ({ matchedCard }) => {
  const queryClient = useQueryClient();
  const [likeCount, setLikeCount] = useState<number>(matchedCard.likes);

  // 좋아요를 클릭했을 때
  const contentLikesMutation = useMutation({
    mutationFn: (newData: CardResult) => {
      return instance.patch(`/result/${matchedCard.id}`, newData);
    },
    onSuccess: () => {
      console.log('contentLikesMutation success!');
      queryClient.invalidateQueries({ queryKey: ['fetchCardData'] }); // 수정이 성공하면 쿼리를 다시 가져옴
    },
  });

  const handleContentLikesClick = () => {
    const newLikeCount = likeCount + 1;
    setLikeCount(newLikeCount);

    contentLikesMutation.mutate({
      id: matchedCard.id,
      title: matchedCard.title,
      body: matchedCard.body,
      time: matchedCard.time,
      commentNum: matchedCard.commentNum,
      author: matchedCard.author,
      likes: newLikeCount,
    });
  };

  return (
    <div className="font-pretendard items-center flex gap-x-2">
      <div className="cursor-pointer">
        <ThumbUpAltIcon
          width={16}
          height={16}
          sx={{ color: 'black' }}
          className="dark:text-white"
          onClick={handleContentLikesClick}
        />
      </div>

      <div className="text-black dark:text-white">{likeCount}</div>
    </div>
  );
};

export default LikesBtn;
