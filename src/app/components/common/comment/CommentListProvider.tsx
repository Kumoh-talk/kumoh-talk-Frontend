'use client';

import { createContext, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CommentList, CommentListApi } from '@/app/lib/types/comment/commentList';

export const CommentListContext = createContext<{
  success: string;
  data: CommentList;
  fetchData: () => Promise<void>;
  boardId: string | number | null;
  commentTargetBoardType: string;
}>({
  success: 'false',
  data: {} as CommentList,
  fetchData: async () => {
  },
  boardId: 1,
  commentTargetBoardType: '',
});

interface Props {
  children: React.ReactNode;
}

export function CommentListProvider({ children }: Props) {
  const [state, setState] = useState<CommentListApi>({
    success: 'false',
    data: {} as CommentList,
  });
  const query = useSearchParams();
  const boardId = query.get('id');
  const commentTargetBoardType = query.get('boardType') === 'study' || query.get('boardType') === 'project' || query.get('boardType') === 'mentoring' ? 'recruitment' : 'basic';

  const fetchData = async () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    try {
      const response = await fetch(`${API_URL}/api/v1/comments/${boardId}?commentTargetBoardType=${commentTargetBoardType}`);
      const result = await response.json();

      if (response.ok && 'success' in result && 'data' in result) {
        setState({ success: 'true', data: result.data });
      } else {
        console.error('Failed to fetch data:', result);
        setState({ success: 'false', data: {} as CommentList });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setState({ success: 'false', data: {} as CommentList });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <CommentListContext.Provider
      value={{ success: state.success, data: state.data, fetchData, boardId, commentTargetBoardType }}>
      {children}
    </CommentListContext.Provider>
  );
}
