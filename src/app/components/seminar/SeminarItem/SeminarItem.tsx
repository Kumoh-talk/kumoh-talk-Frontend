import Link from 'next/link';
import type { BoardArticle } from '@/app/lib/types/board/board';
import styles from './SeminarItem.module.scss';

const SeminarItem = ({ seminar }: { seminar: BoardArticle }) => {
  const { boardId, title, userName, view, like, headImageUrl, createdAt } = seminar;

  return (
    <li className={styles.item}>
      <div className={styles.imageContainer}>
        <img className={styles.image} src={headImageUrl} alt={`${title}_image`}/>
      </div>
      <span className={styles.title} role='link'>
        <Link href={`seminar/${boardId}`}>{title}</Link>
      </span>
      <span className={styles.author}>{userName}</span>
      <span className={styles.datetime}>{createdAt.slice(0, 10)}</span>
      <span className={styles.view}>{view}</span>
      <span className={styles.like}>{like}</span>
    </li>
  );
};

export default SeminarItem;
