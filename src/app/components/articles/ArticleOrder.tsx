import styles from './articleOrder.module.scss';
import ArticleOrderItem from './ArticleOrderItem';

const orders = [
  {
    name: '최신순',
    order: 'desc',
  },
  {
    name: '오래된 순',
    order: 'asc',
  },
];

export default function ArticleOrder({
  searchParams,
}: {
  searchParams: { category?: string; page?: string; order?: string };
}) {
  console.log(searchParams)
  const order = searchParams.order ?? 'desc';
  const tabs = orders.map((item) => (
    <ArticleOrderItem
      key={item.order}
      name={item.name}
      order={item.order}
      searchParams={searchParams}
      selected={order === item.order}
    />
  ));
  return <ul className={styles.order}>{tabs}</ul>;
}
