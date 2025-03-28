import Link from 'next/link';
import styles from './noticeList.module.scss';
import PageMoreSvg from '@/app/assets/svg/PageMoreSvg';
import { BoardArticle } from '@/app/lib/types/board/board';
import NoticeItem from './NoticeItem';
import { getBoardArticles } from '@/app/lib/apis/boards';

export default async function NoticeList() {
  const list: BoardArticle[] = [];

  try {
    list.push(...(await getBoardArticles('NOTICE', 1, 9)));
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  const articleList =
    list.length > 0 ? (
      list
        .map((item) => <NoticeItem key={item.boardId} {...item} />)
        .slice(0, 7)
    ) : (
      <div className={styles.noArticle}>공지사항이 없습니다.</div>
    );

  return (
    <section className={styles.container}>
      <header>
        <span>공지사항</span>
        <Link href="/notice">
          더 보기
          <PageMoreSvg />
        </Link>
      </header>
      <ul className={styles.list}>{articleList}</ul>
    </section>
  );
}
