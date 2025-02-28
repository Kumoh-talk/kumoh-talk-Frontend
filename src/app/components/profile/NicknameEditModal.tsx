'use client';

import nicknameEditAction from '@/app/lib/apis/profile/nicknameEditAction';
import Button from '../common/button/Button';
import Modal from '../common/modal/ModalBackup';
import styles from './nicknameEditModal.module.scss';

export interface Props {
  onClose: () => void;
}

export default function NicknameEditModal({ onClose }: Props) {
  return (
    <Modal onClose={onClose}>
      <h1 className={styles.title}>닉네임 변경</h1>
      <form className={styles.form} onSubmit={nicknameEditAction}>
        <input
          placeholder="새로운 닉네임을 입력해주세요."
          name="nickname"
          required
          autoFocus
        />
        <div className={styles.actions}>
          <Button size="medium" bgColor="bg-gray-800" onClick={onClose}>
            뒤로가기
          </Button>
          <Button type="submit" size="medium">
            변경하기
          </Button>
        </div>
      </form>
    </Modal>
  );
}
