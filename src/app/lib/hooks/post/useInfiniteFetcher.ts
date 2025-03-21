import { toast } from 'react-toastify';
import { useState, useCallback } from 'react';
import { getMyDrafts } from '@/app/lib/apis/post/boards';
import type { DraftPreview } from '@/app/lib/types/post/boards';

type FetchState = {
  data: DraftPreview[];
  state: 'idle' | 'loading' | 'fetched' | 'error';
  hasNextPage: boolean;
};

const useInfiniteFetcher = () => {
  const [fetchState, setFetchState] = useState<FetchState>({
    state: 'idle',
    data: [],
    hasNextPage: true,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;

  const fetchNextPage = useCallback(async () => {
    setFetchState((prev) => ({
      ...prev,
      state: 'loading',
    }));

    const response = await getMyDrafts(currentPage, pageSize);

    if (response.success === 'true') {
      const { pageContents: nextPageData, pageNum, totalPage } = response.data;
      const hasNextPage = pageNum < totalPage;

      setFetchState((prev) => {
        const nextData = [...(prev.data || []), ...nextPageData];

        return {
          data: nextData,
          state: 'fetched',
          hasNextPage,
        };
      });

      setCurrentPage(prev => prev + 1);
    } else {
      toast.error('임시 저장 글을 가져오는 중 오류가 발생했습니다.');
    }
  }, [currentPage]);

  return {
    ...fetchState,
    setFetchState,
    fetchNextPage,
  };
};

export default useInfiniteFetcher;
