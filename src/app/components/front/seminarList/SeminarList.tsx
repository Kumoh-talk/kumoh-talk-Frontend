import { BoardArticle } from '@/app/lib/types/board/board';
import SeminarItem from './SeminarItem';
import styles from './seminarList.module.scss';
import { getBoardArticles } from '@/app/lib/apis/boards';

export default async function SeminarList() {
  const list: BoardArticle[] = [];

  try {
    list.push(...(await getBoardArticles('SEMINAR', 1, 7)));
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
