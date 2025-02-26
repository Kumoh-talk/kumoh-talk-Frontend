import { Comment } from '../../types/comment/commentList';
import { PostBoard } from '../../types/recruitmentBoards/post/postBoard';
import { PostForm } from '../../types/recruitmentBoards/post/postForm';

const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api`;

export const matchRecruitmentTitle = (recruitmentBoardType: string) => {
  const typeObj: {
    [key: string]: string;
  } = {
    study: '스터디',
    project: '프로젝트',
    mentoring: '멘토링',
  };
  return typeObj[recruitmentBoardType];
};

const _fetch = async (
  url: string,
  options: RequestInit,
  body?: string | any
) => {
  if (body && typeof body !== 'string') {
    options.body = JSON.stringify(body);
  }
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(JSON.stringify(await response.json()));
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getRecruitmentBoardDetail = (recruitmentBoardId: string) => {
  return _fetch(`${baseUrl}/recruitment-boards/${recruitmentBoardId}/board`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    cache: 'no-store',
  });
};

export const postRecruitmentBoard = (formData: {
  board: PostBoard;
  form: PostForm[];
}) => {
  return _fetch(
    `${baseUrl}/recruitment-boards?status=published`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    },
    formData
  );
};

export const getRecruitmentBoardComment = (recruitmentBoardId: string) => {
  return _fetch(`${baseUrl}/recruitment-board/comments/${recruitmentBoardId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    cache: 'no-store',
  });
};

export const postRecruitmentBoardComment = (
  recruitmentBoardId: string,
  body: Comment
) => {
  return _fetch(
    `${baseUrl}/recruitment-board/comments/${recruitmentBoardId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    },
    body
  );
};

export const patchRecruitmentBoardComment = (
  commentId: number,
  body: Comment
) => {
  console.log(body);
  return _fetch(
    `${baseUrl}/recruitment-board/comments/${commentId}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    },
    body
  );
};

export const deleteRecruitmentBoardComment = (commentId: number) => {
  return _fetch(`${baseUrl}/recruitment-board/comments/${commentId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
};

export const reportRecruitmentBoardComment = (commentId: number) => {
  console.log(`${commentId} 댓글을 신고`);
};
