'use client';

import { usePathname } from 'next/navigation';
import Button from '../common/button/Button';
import Modal from '../common/modal/Modal';
import styles from './signOutModal.module.scss';

export interface Props {
  onClose: () => void;
}

const provider = 'GOOGLE';

export default function SignOutModal({ onClose }: Props) {
  const pathname = usePathname();
  return (
    <Modal onClose={onClose}>
      <h1 className={styles.title}>
        정말로 야밤의 금오톡
        <br />
        <span className={styles.emphasized}>회원 탈퇴</span>를 진행하시겠어요?
      </h1>
      <p className={styles.content}>
        회원 탈퇴를 하면 저장된 모든 데이터와 기록이 삭제되며 복구가 불가능해요!{' '}
        <br />
        그래도 탈퇴를 원하시면 아래 버튼을 눌러주세요.
      </p>
      <div className={styles.actions}>
        <Button size="medium" bgColor="bg-gray-800" onClick={onClose}>
          뒤로가기
        </Button>
        <a
          href={`${
            process.env.NEXT_PUBLIC_API_URL
          }/api/users/oauth2/${provider.toLowerCase()}?redirect-uri=${
            process.env.NEXT_PUBLIC_BASE_URL
          }${pathname}&mode=unlink`}
        >
          <Button size="medium">탈퇴하기</Button>
        </a>
      </div>
    </Modal>
  );
}
