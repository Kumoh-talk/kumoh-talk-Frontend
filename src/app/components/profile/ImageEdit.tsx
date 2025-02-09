'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './imageEdit.module.scss';
import PenSvg from '@/app/assets/svg/PenSvg';
import ImageEditMenu from './ImageEditMenu';

export default function ImageEdit({
  profileImageUrl,
}: {
  profileImageUrl: string;
}) {
  const [isShow, setIsShow] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsShow(false);
      }
    };

    if (isShow) {
      window.addEventListener('click', onClickOutside);
    } else {
      window.removeEventListener('click', onClickOutside);
    }

    return () => {
      window.removeEventListener('click', onClickOutside);
    };
  }, [isShow]);

  return (
    <div className={styles.imageContainer}>
      <img
        className={styles.image}
        src={profileImageUrl || '/images/defaultProfileImage.svg'}
        alt="프로필 사진"
        width={100}
        height={100}
      />
      <div ref={menuRef} className={styles.editContainer}>
        <button className={styles.button} onClick={() => setIsShow(!isShow)}>
          <div className={styles.icon}>
            <PenSvg />
          </div>
          <span className={styles.buttonText}>수정</span>
        </button>
        <ImageEditMenu isShow={isShow} />
      </div>
    </div>
  );
}
