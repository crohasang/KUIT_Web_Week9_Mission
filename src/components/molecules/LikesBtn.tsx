import React, { useState } from 'react';
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import instance from '../../apis/instance';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

interface Props {
  likeCount: number;
}

const LikesBtn: React.FC<Props> = ({ likeCount }) => {
  // const queryClient = useQueryClient();

  // 좋아요 갯수 상태
  const [likeCountState, setLikeCountState] = useState<number>(likeCount);

  // 좋아요 버튼 patch mutation -> Content.tsx에서 patch mutation이 있었는데..

  // 좋아요 버튼을 클릭했을 때 함수 -> 좋아요를 누르면 좋아요 카운트가 1 늘어난다.
  // likeCount에 1을 더해줘야 겠네요?

  return (
    <div className="font-pretendard items-center flex gap-x-2">
      <div className="cursor-pointer">
        <ThumbUpAltIcon
          width={16}
          height={16}
          sx={{ color: 'black' }}
          className="dark:text-white"
          onClick={() => {}}
        />
      </div>

      <div className="text-black dark:text-white">{likeCountState}</div>
    </div>
  );
};

export default LikesBtn;
