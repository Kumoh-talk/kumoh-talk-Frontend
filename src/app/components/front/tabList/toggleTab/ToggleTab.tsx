'use client';

import { useSearchParams } from 'next/navigation';
import clsx from 'clsx';
import styles from './toggleTab.module.scss';
import Link from 'next/link';

export interface Props {
  value: string;
  label: string;
  isDefault?: boolean;
}

export default function ToggleTab({ value, label, isDefault }: Props) {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab');

  const onClick = () => {
    // next/link 쓰면 클릭시 페이지 상단으로 이동해서 이렇게 함
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('tab', value);
    window.history.replaceState(
      null,
      '',
      `${window.location.pathname}?${searchParams.toString()}`,
    );
  };

  return (
    <Link
      href={`/?tab=${value}`}
      passHref
      className={clsx(styles.toggleTab, {
        [styles.on]: currentTab === value || (!currentTab && isDefault),
      })}
    >
      {label}
    </Link>
  );
}
