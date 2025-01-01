import { ApplyList } from '@/app/lib/types/recruitmentBoards/applyList';
import { useEffect, useState } from 'react';

export interface Props {
  boardId: string | number;
  page: string | number;
  sort: 'createdAt' | 'desc';
}

export default function useGetApplyList({ boardId, page, sort }: Props) {
  const [data, setData] = useState({ success: 'false', data: {} as ApplyList });
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const token = process.env.NEXT_PUBLIC_ACCESS_TOKEN || '';

  useEffect(() => {
    try {
      const fetchApplyList = async () => {
        const response = await fetch(
          `${API_URL}/api/v1/applications/recruitment/${boardId}?size=10&page=${page}&sort=${sort}`,
          {
            method: 'GET',
            redirect: 'follow',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        const result = await response.json();

        if (response.ok && 'success' in result && 'data' in result) {
          setData({ success: 'true', data: result.data });
        } else {
          console.error('Failed to fetch data:', result);
          setData({ success: 'false', data: {} as ApplyList });
        }
      };

      fetchApplyList();
    } catch (error) {
      console.error('Error fetching data:', error);
      setData({ success: 'false', data: {} as ApplyList });
    }
  }, [boardId, page, sort, token]);

  return { ...data };
}
