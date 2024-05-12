import React, { useState } from 'react';
import TopButton from '../components/atoms/TopButton';
import SearchHeader from '../components/organisms/Appbar';
import SendIcon from '@mui/icons-material/Send';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import instance from '../apis/instance';
import { useNavigate } from 'react-router-dom';
import uuid from 'react-uuid';

const Write = () => {
  // 제목
  const [newTitle, setNewTitle] = useState<string>('');

  // 본문
  const [newWriting, setNewWriting] = useState<string>('');

  const date = new Date();
  const navigate = useNavigate();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  const handleWritingChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewWriting(e.target.value);
  };

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const queryClient = useQueryClient();

  // 본문 작성 후 mutation
  const contentSubmitMutation = useMutation({
    mutationFn: async (newData: {
      id: string;
      title: string;
      body: string;
      time: string;
      commentNum: number;
      author: string;
      likes: number;
    }) => {
      return await instance.post('/result', newData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fetchCardData'] }); // 수정이 성공하면 쿼리를 다시 가져옴
    },
  });

  // 제출
  const handleWritingSubmit = async (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (newTitle.trim() === '') {
      alert('제목이 빈 칸인데요?');
    } else if (newWriting.trim() === '') {
      alert('본문에 아무것도 안 적으셨네요??');
    } else {
      // 서버에 POST 요청 보내기
      await contentSubmitMutation.mutate({
        id: uuid(),
        title: newTitle,
        body: newWriting,
        time: formatDate(date),
        commentNum: 0,
        author: '작성자',
        likes: 0,
      });

      await navigate('/');
      console.log('New comment:', newWriting);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-white flex flex-col px-8">
      <SearchHeader />
      <div className="font-pretendard text-black sm:mx-32 mt-10">
        <form className="mt-4">
          <div className="text-xl font-semibold dark:text-white">제목</div>
          <input
            value={newTitle}
            onChange={handleTitleChange}
            className="w-full p-2 border rounded-md h-10 mt-4"
          />

          <div className="flex mt-8">
            <div className="text-xl font-semibold">본문</div>
          </div>

          <div className="w-full h-80 mt-4">
            <textarea
              value={newWriting}
              onChange={handleWritingChange}
              className="w-full h-full p-2 border rounded-md"
            />
          </div>

          <div className="flex justify-end mb-20">
            <SendIcon
              sx={{ color: 'black', cursor: 'pointer' }}
              className="dark:text-white"
              onClick={handleWritingSubmit}
            />
          </div>
        </form>
      </div>
      <TopButton />
    </div>
  );
};

export default Write;
