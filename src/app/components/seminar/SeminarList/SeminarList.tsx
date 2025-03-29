import { getBoards } from '@/app/lib/apis/notice/notice';
import SeminarItem from '@/app/components/seminar/SeminarItem/SeminarItem';
import type { BoardSearchParams } from '@/app/lib/types/notice/board';
import type { BoardArticle } from '@/app/lib/types/board/board';
import styles from './SeminarList.module.scss';

export default async function SeminarList({ searchParams }: BoardSearchParams) {
  const page = searchParams.page ?? '1';
  const sort = searchParams.sort ?? 'DESC';

  const seminarList: BoardArticle[] = [];

  try {
    seminarList.push(...(await getBoards('SEMINAR', page, '15', sort)));
  } catch (error) {
    console.error(error);
  }

  return (
    <ul className={styles.list}>
      {seminarList.length > 0 ? (
        seminarList.map((seminar) => (
          <SeminarItem key={seminar.boardId} seminar={seminar} />
        ))
      ) : (
        <div className={styles.empty}>세미나 글이 없습니다.</div>
      )}
    </ul>
  );
}
