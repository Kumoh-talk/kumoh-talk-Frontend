'use client';

import { createContext, useState, useEffect } from 'react';
import { StudyProjectBoard, StudyProjectBoardApi } from '@/app/lib/types/studyProject/studyProjectBoard';

export const StudyAndProjectDetailContext = createContext<{
  state: StudyProjectBoardApi;
  setState: React.Dispatch<React.SetStateAction<StudyProjectBoardApi>>;
  fetchData: () => Promise<void>;
}>({
  state: { success: 'false', data: {} as StudyProjectBoard },
  setState: () => {},
  fetchData: async () => {},
});

interface Props {
  children: React.ReactNode;
}

export function StudyAndProjectDetailProvider({ children }: Props) {
  const [state, setState] = useState<StudyProjectBoardApi>({
    success: 'false',
    data: {} as StudyProjectBoard,
  });

  const fetchData = async () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    try {
      const response = await fetch(`${API_URL}/api/v1/recruitment-boards/12/board`);
      const result = await response.json();

      if (response.ok && 'success' in result && 'data' in result) {
        setState({ success: 'true', data: result.data });
      } else {
        console.error('Failed to fetch data:', result);
        setState({ success: 'false', data: {} as StudyProjectBoard });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setState({ success: 'false', data: {} as StudyProjectBoard });
    }
  };

  return (
    <StudyAndProjectDetailContext.Provider value={{ state, setState, fetchData }}>
      {children}
    </StudyAndProjectDetailContext.Provider>
  );
}
