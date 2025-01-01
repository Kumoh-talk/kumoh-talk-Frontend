import Link from 'next/link';
import { CategoryIdType } from '../../articles/ArticleItem';
import ArticleTag, { ArticleTagNameType } from './article-tag/article-tag';
import styles from './articleCard.module.scss';

export interface Props {
  tags: ArticleTagNameType[];
  categoryId: CategoryIdType;
  articleId: number;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  target: string[];
  currentCount: number;
  maxCount: number;
  thumbnail: string;
  size?: 'normal' | 'large';
}

export default function ArticleCard({
  tags,
  categoryId,
  articleId,
  title,
  description,
  startDate,
  endDate,
  target,
  currentCount,
  maxCount,
  thumbnail,
  size = 'normal',
}: Props) {

  return (
    <li
      className={
        size === 'large' ? styles.articleCardLarge : styles.articleCard
      }
    >
      <Link href={`${categoryId.toLowerCase()}/${articleId}`}>
        <div className={styles.thumbnail}>
          <img src="/images/thumbnail.png" alt="썸네일" />
        </div>
        <div className={styles.info}>
          <ul className={styles.tags}>
            {tags.map((tag) => (
              <ArticleTag key={tag} name={tag} />
            ))}
          </ul>
          <div className={styles.titleWrapper}>
            <span className={styles.title}>{title}</span>
            <span className={styles.description}>{description}</span>
          </div>
          <div className={styles.targetWrapper}>
            <div>
              모집대상
              <span>{target.join(',')}</span>
            </div>
            <div>
              모집인원
              <span>
                <span className={styles.currentCount}></span>
                {currentCount}/{maxCount}
              </span>
            </div>
          </div>
          <div className={styles.durationWrapper}>
            <div>
              신청기간
              <span>
                {startDate.toLocaleDateString('sv-SE')}~{endDate.toLocaleDateString('sv-SE')}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}
