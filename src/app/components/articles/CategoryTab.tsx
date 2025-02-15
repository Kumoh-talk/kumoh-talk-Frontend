import clsx from 'clsx';
import styles from './categoryTab.module.scss';
import Link from 'next/link';

export interface Props {
  name: string;
  categoryId: string;
  selected: boolean;
  searchParams: { category?: string; page?: string; order?: string };
}

export default function CategoryTab({
  name,
  categoryId,
  selected,
  searchParams,
}: Props) {
  const params = new URLSearchParams(searchParams as Record<string, string>);
  params.set('category', categoryId);
  params.delete('page');
  const url = params.toString();
  return (
    <li className={styles.tab}>
      <Link
        href={`?${url}`}
        className={clsx(
          styles.button,
          { [styles.selected]: selected },
          styles[categoryId],
        )}
      >
        {name}
      </Link>
    </li>
  );
}
