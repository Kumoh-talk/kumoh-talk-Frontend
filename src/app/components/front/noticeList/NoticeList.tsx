import Link from 'next/link';
import styles from './noticeList.module.scss';
import PageMoreSvg from '@/app/assets/svg/PageMoreSvg';
import { BoardItemData } from '../seminarList/SeminarList';
import NoticeItem from './NoticeItem';

export default async function NoticeList() {
  const list: BoardItemData[] = [];

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/boards/?boardType=NOTICE&size=9&page=1&sort=createdAt,DESC`,
    );
    const result = await response.json();

    if (response.ok && 'success' in result && 'data' in result) {
      list.push(...(result.data.pageContents as BoardItemData[]));
    } else {
      console.error('Failed to fetch data:', result);
    }
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
