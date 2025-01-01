'use client';

import clsx from 'clsx';
import styles from './categoryTab.module.scss';

export interface Props {
  name: string;
  categoryId: string;
  selected: boolean;
}

export default function CategoryTab({ name, categoryId, selected }: Props) {
  const onClick = () => {
    // params category를 categoryId로 변경
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('category', categoryId);
    window.history.replaceState(
      null,
      '',
      `${window.location.pathname}?${searchParams.toString()}`,
    );
  };
  console.log(categoryId, selected);

  return (
    <li className={styles.tab}>
      <button
        className={clsx(
          styles.button,
          { [styles.selected]: selected },
          styles[categoryId],
        )}
        onClick={onClick}
      >
        {name}
      </button>
    </li>
  );
}
