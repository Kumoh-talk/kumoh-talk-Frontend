import CategoryTab from './CategoryTab';
import styles from './categoryList.module.scss';

const categories = [
  {
    name: '멘토링',
    categoryId: 'mentoring',
  },
  {
    name: '스터디',
    categoryId: 'study',
  },
  {
    name: '프로젝트',
    categoryId: 'project',
  },
];

export default function CategoryList({
  searchParams,
}: {
  searchParams: { category?: string; page?: string; order?: string };
}) {
  const categoryId = searchParams.category ?? 'mentoring';
  const tabs = categories.map((category) => (
    <CategoryTab
      key={category.categoryId}
      name={category.name}
      categoryId={category.categoryId}
      searchParams={searchParams}
      selected={categoryId === category.categoryId}
    />
  ));
  return <ul className={styles.list}>{tabs}</ul>;
}
