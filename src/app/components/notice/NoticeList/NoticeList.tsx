import { getBoards } from '@/app/lib/apis/notice/notice';
import NoticeItem from '@/app/components/notice/NoticeItem/NoticeItem';
import type { BoardSearchParams } from '@/app/lib/types/notice/board';
import type { BoardArticle } from '@/app/lib/types/board/board';
import styles from './NoticeList.module.scss';

export default async function NoticeList({ searchParams }: BoardSearchParams) {
  const page = searchParams.page ?? '1';
  const sort = searchParams.sort ?? 'DESC';

  const noticeList: BoardArticle[] = [];

  try {
    noticeList.push(...(await getBoards('NOTICE', page, '15', sort)));
  } catch (error) {
    console.error(error);
  }

  return (
    <ul className={styles.list}>
      {noticeList.length > 0 ? (
        noticeList.map((notice) => (
          <NoticeItem key={notice.boardId} notice={notice} />
        ))
      ) : (
        <div className={styles.empty}>공지사항이 없습니다.</div>
      )}
    </ul>
  );
}
