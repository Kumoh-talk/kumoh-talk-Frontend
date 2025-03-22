'use client';

import clsx from 'clsx';
import BasicBubble from '../../../../basicBubble/BasicBubble';
import CloseButton from './CloseButton';
import styles from './selectBubble.module.scss';
import { useRouter } from 'next/navigation';
import { useMediaQueryMobileHeader } from '@/app/lib/hooks/useMediaQueryMobileHeader';
import Button from '@/app/components/common/button/Button';

export interface Props {
  className: string;
  isAdmin : boolean;
  onClose: () => void;
}

export default function SelectBubble({ className, isAdmin, onClose }: Props) {
  const isMobileHeader = useMediaQueryMobileHeader();
  const router = useRouter();

  return (
    <BasicBubble
      direction={isMobileHeader ? 'top-end' : 'top-end'}
      className={clsx(className, styles.loginBubble)}
    >
      <CloseButton onClick={onClose} />
      <section className={styles.content}>
        <div className={styles.linkWrapper}>
          {isAdmin && (
            <Button
              className={styles.button}
              size='medium'
              onClick={() => {
                router.push('/post?type=notice');
              }}
            >
              공지사항
            </Button>
          )}
          <Button
            className={styles.button}
            size='medium'
            onClick={() => {
              router.push('/post');
            }}
          >
            세미나
          </Button>
          <Button
            className={styles.button}
            size='medium'
            onClick={() => {
              router.push('/recruitment-boards/post');
            }}
          >
            멘토링/프로젝트/스터디
          </Button>
        </div>
      </section>
    </BasicBubble>
  );
}
