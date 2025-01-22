'use client';

import { createContext, useState, useEffect } from 'react';
import {
  RecruitmentBoards,
  RecruitmentBoardsApi,
} from '@/app/lib/types/recruitmentBoards/recruitmentBoards';
import { usePathname, useSearchParams } from 'next/navigation';

export const RecruitmentBoardDetailContext = createContext<{
  success: string;
  data: RecruitmentBoards;
  fetchData: () => Promise<void>;
}>({
  success: 'false',
  data: {} as RecruitmentBoards,
  fetchData: async () => {},
});

interface Props {
  children: React.ReactNode;
}

export function RecruitmentBoardDetailProvider({ children }: Props) {
  const [state, setState] = useState<RecruitmentBoardsApi>({
    success: 'false',
    data: {} as RecruitmentBoards,
  });
  const boardId = useSearchParams().get('id');

  const fetchData = async () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    try {
      const response = await fetch(
        `${API_URL}/api/v1/recruitment-boards/${boardId}/board`
      );
      const result = await response.json();

      if (response.ok && 'success' in result && 'data' in result) {
        setState({ success: 'true', data: result.data });
      } else {
        console.error('Failed to fetch data:', result);
        setState({ success: 'false', data: {} as RecruitmentBoards });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setState({ success: 'false', data: {} as RecruitmentBoards });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <RecruitmentBoardDetailContext.Provider
      value={{ success: state.success, data: state.data, fetchData }}
    >
      {children}
    </RecruitmentBoardDetailContext.Provider>
  );
}
