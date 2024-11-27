'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './background.module.scss';

export interface Props {
  children: React.ReactNode;
  alwaysVisible?: boolean;
  className?: string;
}

export default function Background({
  children,
  alwaysVisible = false,
  className = '',
}: Props) {
  const [isTop, setTop] = useState(true);

  const onScroll = () => {
    setTop(window.scrollY < 2);
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={clsx(styles.background, className, {
        [styles.visible]: !isTop || alwaysVisible,
      })}
    >
      {children}
    </header>
  );
}
