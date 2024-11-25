import { RecruitmentBoardsApi } from '@/app/lib/types/recruitmentBoards/recruitmentBoards';
import { useQuery } from '@tanstack/react-query';

const fetchData = async (boardId: string): Promise<RecruitmentBoardsApi> => {
  const response = await fetch(`${'서버 url'}/boards/api/v1/recruitment-boards/${boardId}/board`);

  if (!response.ok) {
    throw new Error('게시물 정보를 불러올 수 없습니다.');
  }

  return await response.json();
}

export default function useGetStudyProjectBoardDetail(boardId: string) {
  return useQuery({
    queryKey: [ 'study-project-board-detail', boardId ],
    queryFn: () => fetchData(boardId),
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
}