'use client';

import { useState, useRef, useCallback, MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import { debounce } from 'es-toolkit';
import Link from 'next/link';
import clsx from 'clsx';
import { useSubmitDraft } from '@/app/lib/hooks/post/useSubmitDraft';
import useClickOutside from '@/app/lib/hooks/common/useClickOutside';
import useAutoSave from '@/app/lib/hooks/post/useAutoSave';
import Image from 'next/image';
import Button from '../../common/button/Button';
import logo from '@/app/assets/png/logo.png';
import Draft from '../Draft/Draft';
import styles from './Header.module.scss';

type ModalType = 'draft' | 'publish';

const Header = () => {
  const [activeModal, setActiveModal] = useState<ModalType | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useClickOutside(modalRef, () => setActiveModal(null));

  const { lastSavedAt } = useAutoSave();

  const router = useRouter();

  const handleClose = () => {
    setActiveModal(null);
  };

  const { submitDraft } = useSubmitDraft(handleClose);

  const debouncedSubmitDraft = useCallback(debounce(submitDraft, 1000), [
      submitDraft,
    ]);

  const handleNavigation = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    const confirmLeave = confirm('페이지를 이동하시겠습니까? 변경사항이 저장되지 않을 수 있습니다.');

    if (confirmLeave) {
      router.push(href);
    }
  };

  return (
    <>
      <div className={styles.header}>
        <Link href='/' onClick={(e) => handleNavigation(e, '/')}>
          <Image
            src={logo}
            alt='세미나 신청 이미지'
            width={32}
            height={32}
            priority
          />
        </Link>
        <div className={styles.buttonGroup}>
          {lastSavedAt && <span>{`자동 저장 완료 ${lastSavedAt}`}</span>}
          <div className={styles.draft}>
            <button className={styles.saveButton} onClick={debouncedSubmitDraft}>
              임시저장
            </button>
            <div className={styles.divider} />
            <button
              className={styles.listButton}
              onClick={() => setActiveModal('draft')}
            >
              임시 글
            </button>
          </div>
          <Button onClick={() => setActiveModal('publish')}>게시하기</Button>
        </div>
      </div>
      <div className={clsx(styles.overlay, { [styles.show]: activeModal })}>
        <div
          className={clsx(styles.content, { [styles.show]: activeModal })}
          ref={modalRef}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.layer}>
            {activeModal === 'draft' && <Draft close={handleClose} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
