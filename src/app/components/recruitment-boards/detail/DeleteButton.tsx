'use client';

import { deleteRecruitmentBoard } from '@/app/lib/apis/recruitment-boards/recruitmentBoard';
import Button from '../../common/button/Button';
import { useRouter } from 'next/navigation';

export default function DeleteButton({
  recruitmentBoardId,
}: {
  recruitmentBoardId: string;
}) {
  const router = useRouter();

  const onDelete = async () => {
    const response = await deleteRecruitmentBoard(recruitmentBoardId);

    if (response.success === 'true') {
      alert('게시물이 삭제되었습니다.');
      router.replace('../');
    } else {
      alert('게시물 삭제에 실패했습니다.');
      router.replace('../');
    }
  };

  return (
    <Button size='medium' bgColor='bg-red' onClick={onDelete}>
      삭제하기
    </Button>
  );
}
