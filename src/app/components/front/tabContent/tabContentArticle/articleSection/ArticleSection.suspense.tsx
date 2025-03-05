import Link from 'next/link';
import PageMoreSvg from '@/app/assets/svg/PageMoreSvg';
import ScrollableList from '../../../scrollableList/ScrollableList';
import { RecruitmentType } from '@/app/lib/types/recruitmentBoards/recruitmentBoards';
import styles from './articleSection.module.scss';
import ArticleCardSuspense from '../../../articleCard/ArticleCard.suspense';
import clsx from 'clsx';

export default function ArticleSectionSuspense({
  title,
  category,
  size = 'normal',
}: {
  title: string;
  category: RecruitmentType;
  size?: 'large' | 'normal';
}) {
  return (
    <section className={styles.card}>
      <header>
        <span>{title}</span>
        <Link href={`/recruitment-boards?category=${category.toLowerCase()}`}>
          더 보기
          <PageMoreSvg />
        </Link>
      </header>
      <ScrollableList size={size}>
        <ul className={clsx(styles.cardList, styles[size])}>
          <ArticleCardSuspense size={size} />
          <ArticleCardSuspense size={size} />
          <ArticleCardSuspense size={size} />
          <ArticleCardSuspense size={size} />
        </ul>
      </ScrollableList>
    </section>
  );
}
