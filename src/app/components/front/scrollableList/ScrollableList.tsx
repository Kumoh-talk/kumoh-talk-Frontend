'use client';

import clsx from 'clsx';
import styles from './scrollableList.module.scss';
import PagePrevSvg from '@/app/assets/svg/PagePrevSvg';
import PageNextSvg from '@/app/assets/svg/PageNextSvg';
import { useRef } from 'react';

export default function ScrollableList({
  className = '',
  children,
  size = 'normal',
}: {
  className?: string;
  children: React.ReactNode;
  size?: 'normal' | 'large';
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollNext = () => {
    contentRef.current?.scroll({
      left:
        contentRef.current.scrollLeft +
        (size === 'normal' ? 369 + 64 : 564 + 108) * 0.85,
      behavior: 'smooth',
    });
  };
  const scrollPrev = () => {
    contentRef.current?.scroll({
      left:
        contentRef.current.scrollLeft -
        (size === 'normal' ? 369 + 64 : 564 + 108) * 0.85,
      behavior: 'smooth',
    });
  };
  return (
    <div className={clsx(styles.scrollableList, className)}>
      <button
        className={clsx(styles.btnScroll, styles.prev)}
        onClick={scrollPrev}
      >
        <PagePrevSvg />
      </button>
      <div ref={contentRef} className={styles.content}>
        {children}
      </div>
      <button
        className={clsx(styles.btnScroll, styles.next)}
        onClick={scrollNext}
      >
        <PageNextSvg />
      </button>
    </div>
  );
}
