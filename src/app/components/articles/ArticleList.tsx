import ArticleItem, { Props as ArticleItemProps } from './ArticleItem';
import ArticleOrder from './ArticleOrder';
import CategoryList from './CategoryList';
import Pagination from './Pagination';
import styles from './articleList.module.scss';

const dummy: ArticleItemProps[] = Array.from({ length: 15 }, (_, i) => ({
  categoryId: 'STUDY',
  articleId: 1,
  title: '글제목입니다123123',
  createdAt: new Date(),
  commentCount: 3,
}));

export default function ArticleList({
  searchParams,
}: {
  searchParams: { category?: string; page?: number; order?: string };
}) {
  const list = dummy.map((article) => (
    <ArticleItem key={article.articleId} {...article} />
  ));
  return (
    <div className={styles.wrapper}>
      <div className={styles.aside}>
        <CategoryList categoryId={searchParams.category ?? 'mentor'} />
        <ArticleOrder />
      </div>
      <ul className={styles.list}>{list}</ul>
      <Pagination />
    </div>
  );
}
