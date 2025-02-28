'use client'

import Image from 'next/image';
import Button from '../../common/button/Button';
import logo from '@/app/assets/png/logo.png';
import styles from './Header.module.scss';

const Header = () => {
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
            onClick={() => {}}
          >
            임시저장
          </Button>
          <Button size='small' onClick={() => {}}>
            게시하기
          </Button>
        </div>
      </div>
    </>
  );
};

export default Header;
