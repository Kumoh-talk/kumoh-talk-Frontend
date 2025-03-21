import Link from 'next/link';
import styles from './categoryList.module.scss';
import clsx from 'clsx';

export interface Props {
  className?: string;
  items: {
    link: string;
    label: string;
  }[];
}

export default function CategoryList(props: Props) {
  const list = props.items.map((item) => (
    <Link key={item.link} href={item.link} className={styles.item}>
      {item.label}
    </Link>
  ));
  return <div className={clsx(styles.container, props.className)}>{list}</div>;
}
