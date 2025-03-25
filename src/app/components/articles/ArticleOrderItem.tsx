import Link from 'next/link';
import styles from './articleOrder.module.scss';
import clsx from 'clsx';

export interface Props {
  name: string;
  order: string;
  selected: boolean;
  searchParams: { category?: string; page?: string; order?: string };
}

export default function ArticleOrderItem({
  name,
  order,
  selected,
  searchParams,
}: Props) {
  const params = new URLSearchParams(searchParams as Record<string, string>);
  params.delete('order');
  params.set('order', order);
  const url = params.toString();
  return (
    <li>
      <Link
        href={`?${url}`}
        className={clsx(styles.link, { [styles.selected]: selected })}
      >
        {name}
      </Link>
    </li>
  );
}
