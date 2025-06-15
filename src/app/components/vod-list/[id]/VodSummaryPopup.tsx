'use client';

import React, { useRef } from 'react';
import styles from './vodSummaryPopup.module.scss';
import VodSummary from './VodSummary';

interface VodSummaryPopupProps {
  isOpen: boolean;
  onClose: () => void;
  summary: string;
}

export default function VodSummaryPopup({
  isOpen,
  onClose,
  summary,
}: VodSummaryPopupProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div ref={modalRef} className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>세미나 요약</h2>
          <button
            onClick={onClose}
            className={styles.closeButton}
            aria-label='세미나 요약 탭 닫기'
          >
            ✕
          </button>
        </div>
        <div className={styles.content}>
          <VodSummary summary={summary} />
        </div>
      </div>
    </div>
  );
}
