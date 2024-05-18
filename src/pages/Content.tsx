import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import DarkModeToggle from '../components/atoms/DarkModeToggle';

import Loading from './Loading';
import LikesBtn from '../components/molecules/LikesBtn';
import SearchHeader from '../components/organisms/Appbar';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import BuildIcon from '@mui/icons-material/Build';
import SendIcon from '@mui/icons-material/Send';
import { useFeedDataQuery } from '../apis/fetchFeedsData';

import useContentEditMutation from '../apis/useContentEditMutation';
import ScrollToTop from './../components/atoms/ScrollToTop';

const Content: React.FC = () => {
  // useParams를 통하여 uri에 있는 id를 가져옴
  const { id } = useParams<{ id: string }>();

  const contentEditMutation = useContentEditMutation(id!);

  // GET
  const { feedData, isFeedDataLoading } = useFeedDataQuery(id!);

  // 수정 중인지
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // 수정된 제목
  const [editedTitle, setEditedTitle] = useState<string>('');

  // 수정된 본문
  const [editedBody, setEditedBody] = useState<string>('');

  // 제목 수정 함수
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.target.value);
  };

  // 본문 수정 함수
  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedBody(e.target.value);
  };

  // 수정 후 제출하기 버튼을 눌렀을 때
  const handleContentEditClick = async () => {
    if (feedData) {
      await contentEditMutation.mutate({
        // id, time, commentNum, author, likes는 그대로이므로
        ...feedData,

        title: editedTitle,
        body: editedBody,
      });

      await setIsEditing(false);
    }
  };

  if (isFeedDataLoading) {
    return <Loading />;
  }

  // 수정 버튼을 눌렀을 때
  const handleEditClick = () => {
    if (feedData !== undefined) {
      setIsEditing(true);
      setEditedTitle(feedData.title);
      setEditedBody(feedData.body);
    }
  };

  // feedData가 undefined일 때를 대비하기 위한 early return
  if (feedData == null) {
    return <Loading />;
  }

  return (
    <div className="font-pretendard min-h-screen w-screen bg-white dark:bg-zinc-700 text-black dark:text-white flex flex-col">
      <SearchHeader />
      <div className=" text-black sm:mx-32 pb-72">
        {isEditing ? (
          // 수정 중이 아닐 때
          <>
            <div className="flex my-8">
              <div className="text-xl font-semibold">제목</div>
            </div>
            <input
              value={editedTitle}
              onChange={handleTitleChange}
              className="w-full p-2 border rounded-md h-10 my-4"
            />
            <div className="flex my-8">
              <div className="text-xl font-semibold">본문</div>
            </div>
            <textarea
              value={editedBody}
              onChange={handleBodyChange}
              className="w-full h-full p-2 border rounded-md"
            />
            <div className="flex justify-end whitespace-nowrap mt-10">
              <SendIcon
                sx={{ color: 'black', cursor: 'pointer' }}
                className="dark:text-white"
                onClick={handleContentEditClick}
              />
            </div>
          </>
        ) : (
          // 수정 중이 아닐 때
          <>
            <div className="text-2xl font-bold dark:text-white mt-4">
              {feedData.title}
            </div>
            <div className="text-sm text-gray-400 dark:text-white mt-4">
              {feedData.author} | {feedData.time}
            </div>
            <div className="h-auto bg-gray-100 dark:bg-gray-800 dark:text-white rounded-lg mt-10 p-4 ">
              {feedData.body}
            </div>
            <div className="flex justify-between mt-10">
              {/* feedData의 likeCount 전달 */}
              <LikesBtn likeCount={feedData.likeCount} />

              <div className="flex gap-x-2 whitespace-nowrap">
                {/* 수정 버튼 */}
                <IconButton aria-label="fix" onClick={handleEditClick}>
                  <BuildIcon
                    sx={{ color: 'black' }}
                    className="dark:text-white"
                  />
                </IconButton>

                {/* 삭제 버튼 */}
                <IconButton aria-label="delete" onClick={() => {}}>
                  <DeleteIcon
                    sx={{ color: 'black' }}
                    className="dark:text-white"
                  />
                </IconButton>
              </div>
            </div>
          </>
        )}
      </div>
      <DarkModeToggle />
      <ScrollToTop />
    </div>
  );
};

export default Content;
