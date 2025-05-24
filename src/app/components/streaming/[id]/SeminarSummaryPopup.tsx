'use client';

import React, { useRef } from 'react';
import styles from './SeminarSummaryPopup.module.scss';
import SeminarSummary from './SeminarSummary';

interface SeminarSummaryPopupProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
}

export default function SeminarSummaryPopup({
  isOpen,
  onClose,
  content,
}: SeminarSummaryPopupProps) {
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
          <SeminarSummary summary={content} />
        </div>
      </div>
    </div>
  );
}
