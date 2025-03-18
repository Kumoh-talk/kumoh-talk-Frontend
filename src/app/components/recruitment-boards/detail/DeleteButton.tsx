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
    await deleteRecruitmentBoard(recruitmentBoardId);
    router.back();
  };

  return (
    <Button size='medium' bgColor='bg-red' onClick={onDelete}>
      삭제하기
    </Button>
  );
}
