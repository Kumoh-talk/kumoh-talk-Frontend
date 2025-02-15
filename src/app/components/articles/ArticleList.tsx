import {
  RecruitmentArticle,
  RecruitmentType,
} from '@/app/lib/types/recruitmentBoards/recruitmentBoards';
import ArticleItem from './ArticleItem';
import ArticleOrder from './ArticleOrder';
import CategoryList from './CategoryList';
import Pagination from './Pagination';
import styles from './articleList.module.scss';
import { getRecruitmentArticlesByPage } from '@/app/lib/apis/recruitmentBoards';

export default async function ArticleList({
  searchParams,
}: {
  searchParams: { category?: string; page?: string; order?: string };
}) {
  const listData: RecruitmentArticle[] = [];

  try {
    const category = (searchParams.category?.toUpperCase() ??
      'MENTORING') as RecruitmentType;
    const page = parseInt(searchParams.page ?? '1');

    const res = await getRecruitmentArticlesByPage(category, page);
    listData.push(...(res?.boardInfo ?? []));
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  const list = listData.map((article) => (
    <ArticleItem key={article.boardId} {...article} />
  ));
  return (
    <div className={styles.wrapper}>
      <div className={styles.aside}>
        <CategoryList searchParams={searchParams} />
        <ArticleOrder />
      </div>
      <ul className={styles.list}>{list}</ul>
      <Pagination searchParams={searchParams} />
    </div>
  );
}
