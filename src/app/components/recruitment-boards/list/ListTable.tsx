'use client';

import ListTitle from '@/app/components/recruitment-boards/list/ListTitle';
import ListContent from '@/app/components/recruitment-boards/list/ListContent';
import styles from './listTable.module.scss';
import { useSearchParams } from 'next/navigation';
import useGetApplyList from '@/app/lib/hooks/useGetApplyList';
import { ApplyListApi } from '@/app/lib/types/recruitmentBoards/applyList';

export default function ListTable() {
  const query = useSearchParams();
  const boardId: string = query.get('id') as string;
  const page: string = query.get('page') as string;
  const sort: 'createdAt' | 'desc' = query.get('sort') as 'createdAt' | 'desc';
  const { success, data }: ApplyListApi = useGetApplyList({
    boardId,
    page,
    sort,
  });

  if (!data.applicantList) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.list}>
      <ListTitle />
      <ListContent />
      <ListContent />
      {data.applicantList.map((applicant) => (
        <ListContent key={applicant.applicantId} />
      ))}
    </div>
  );
}
