import Link from 'next/link';
import ArticleTag from './article-tag/article-tag';
import { RecruitmentArticle } from '@/app/lib/types/recruitmentBoards/recruitmentBoards';
import styles from './articleCard.module.scss';

export interface Props extends RecruitmentArticle {
  size?: 'normal' | 'large';
}

export default function ArticleCard({
  tag,
  type,
  boardId,
  title,
  summary,
  recruitmentStart,
  recruitmentDeadline,
  recruitmentTarget,
  currentMemberNum,
  recruitmentNum,
  size = 'normal',
}: Props) {
  return (
    <li
      className={
        size === 'large' ? styles.articleCardLarge : styles.articleCard
      }
    >
      <Link
        href={`/recruitment-boards/detail?boardType=${type?.toLowerCase()}&id=${boardId}`}
      >
        <div className={styles.thumbnail}>
          <img src="/images/thumbnail.png" alt="썸네일" />
        </div>
        <div className={styles.info}>
          <ul className={styles.tags}>
            <ArticleTag name={tag} />
          </ul>
          <div className={styles.titleWrapper}>
            <span className={styles.title}>{title}</span>
            <span className={styles.description}>{summary}</span>
          </div>
          <div className={styles.targetWrapper}>
            <div>
              <span className={styles.label}>모집대상</span>
              <span>{recruitmentTarget}</span>
            </div>
            <div>
              <span className={styles.label}>모집인원</span>
              <span>
                <span className={styles.currentCount}></span>
                {currentMemberNum}/{recruitmentNum}
              </span>
            </div>
          </div>
          <div className={styles.durationWrapper}>
            <div>
              <span className={styles.label}>신청기간</span>
              <span>
                {new Date(recruitmentStart).toLocaleDateString('sv-SE')}~
                {new Date(recruitmentDeadline).toLocaleDateString('sv-SE')}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}
