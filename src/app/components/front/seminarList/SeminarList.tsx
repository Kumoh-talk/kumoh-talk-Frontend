import SeminarItem from './SeminarItem';
import styles from './seminarList.module.scss';

type BoardType = 'SEMINAR' | 'NOTICE';

type BoardProps = {
  boardType: BoardType;
  page: number;
  size: number;
  sort: string;
};

export type BoardItemData = {
  boardId: number;
  title: string;
  userName: string;
  boardTag: BoardType;
  view: number;
  like: number;
  headImageUrl: string;
  createdAt: string;
};

export default async function SeminarList() {
  const list: BoardItemData[] = [];

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/boards/?boardType=SEMINAR&size=7&page=1&sort=createdAt,DESC`,
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

  const articleList = [
    ...list.map((item) => <SeminarItem key={item.boardId} {...item} />),
    ...[
      <li className={styles.dummy}></li>,
      <li className={styles.dummy}></li>,
      <li className={styles.dummy}></li>,
      <li className={styles.dummy}></li>,
      <li className={styles.dummy}></li>,
      <li className={styles.dummy}></li>,
      <li className={styles.dummy}></li>,
    ],
  ].slice(0, 7);

  return <section className={styles.container}>{articleList}</section>;
}
