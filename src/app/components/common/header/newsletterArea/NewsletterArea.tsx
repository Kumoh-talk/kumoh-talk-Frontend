'use client';

import { useState } from 'react';
import styles from './newsletterArea.module.scss';
import NewsletterBubble from './newsletterBubble/NewsletterBubble';

export default function NewsletterArea() {
  const [isActive, setIsActive] = useState(false);
  return (
    <div className={styles.wrapper}>
      <button className={styles.newsletter} onClick={() => setIsActive(true)}>
        뉴스레터 신청
      </button>
      {isActive && (
        <NewsletterBubble
          className={styles.bubble}
          onClose={() => setIsActive(false)}
        />
      )}
    </div>
  );
}
