'use client';

import styles from './modalBackup.module.scss';

export interface Props {
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ onClose, children }: Props) {
  const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.background} onClick={handleBackgroundClick}>
      <div className={styles.overlay}>{children}</div>
    </div>
  );
}
