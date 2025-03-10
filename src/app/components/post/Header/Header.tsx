'use client';

import { useState, useRef } from 'react';
import clsx from 'clsx';
import useClickOutside from '@/app/lib/hooks/common/useClickOutside';
import Image from 'next/image';
import Button from '../../common/button/Button';
import logo from '@/app/assets/png/logo.png';
import styles from './Header.module.scss';

type ModalType = 'draft' | 'publish';

const Header = () => {
  const [activeModal, setActiveModal] = useState<ModalType | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useClickOutside(modalRef, () => setActiveModal(null));

  return (
    <>
      <div className={styles.header}>
        <Image
          src={logo}
          alt='세미나 신청 이미지'
          width={32}
          height={32}
          priority
        />
        <div className={styles.buttonGroup}>
          <Button
            className={styles.outlineButton}
            color='text-black-50'
            bgColor='bg-white'
            onClick={() => setActiveModal('draft')}
          >
            임시저장
          </Button>
          <Button size='small' onClick={() => setActiveModal('publish')}>
            게시하기
          </Button>
        </div>
      </div>
      <div className={clsx(styles.overlay, { [styles.show]: activeModal })}>
        <div
          className={clsx(styles.content, { [styles.show]: activeModal })}
          ref={modalRef}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.layer}>모달</div>
        </div>
      </div>
    </>
  );
};

export default Header;
