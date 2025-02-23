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

  const articleList = list
    .map((item) => <NoticeItem key={item.boardId} {...item} />)
    .slice(0, 7);

  return (
    <section className={styles.container}>
      <header>
        <span>공지사항</span>
        <Link href="/recruitment-boards?category=mentor">
          더 보기
          <PageMoreSvg />
        </Link>
      </header>
      <ul className={styles.list}>{articleList}</ul>
    </section>
  );
}
