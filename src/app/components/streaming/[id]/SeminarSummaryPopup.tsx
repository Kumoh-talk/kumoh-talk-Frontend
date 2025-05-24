'use client';

import React, { useRef } from 'react';
import styles from './SeminarSummaryPopup.module.scss';
import SeminarSummary from './SeminarSummary';
import WikiCard from './WikiCard';

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
            aria-label='닫기'
          >
            ✕
          </button>
        </div>
        <div className={styles.content}>
          <SeminarSummary summary={content} />
        </div>
      </div>
      <WikiCard
        info={{
          wiki: 'JDBC',
          general:
            '자바 프로그램이 데이터베이스와 쉽게 대화할 수 있게 도와주는 도구',
          expert:
            'Java Database Connectivity의 약자로 Java 기반 애플리케이션의 데이터를 데이터베이스에 저장 및 업데이트하거나, 데이터베이스에 저장된 데이터를 Java에서 사용할 수 있도록 하는 자바 API이다.',
        }}
      />
    </div>
  );
}
