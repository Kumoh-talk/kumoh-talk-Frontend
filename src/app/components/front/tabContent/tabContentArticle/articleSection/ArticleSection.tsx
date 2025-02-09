import Link from 'next/link';
import clsx from 'clsx';
import PageMoreSvg from '@/app/assets/svg/PageMoreSvg';
import ScrollableList from '../../../scrollableList/ScrollableList';
import ArticleCard from '../../../articleCard/ArticleCard';
import { getRecruitmentArticlesByPage } from '@/app/lib/apis/recruitmentBoards';
import {
  RecruitmentArticle,
  RecruitmentType,
} from '@/app/lib/types/recruitmentBoards/recruitmentBoards';
import styles from './articleSection.module.scss';

export default async function ArticleSection({
  title,
  category,
  size = 'normal',
}: {
  title: string;
  category: RecruitmentType;
  size?: 'large' | 'normal';
}) {
  const listData: RecruitmentArticle[] = [];
  try {
    const list = await getRecruitmentArticlesByPage(category);
    listData.push(...list);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  const list = listData.map((article) => (
    <ArticleCard key={article.boardId} size={size} {...article} />
  ));
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
        <ul className={clsx(styles.cardList, styles[size])}>{list}</ul>
      </ScrollableList>
    </section>
  );
}
