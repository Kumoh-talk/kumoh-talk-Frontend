'use client';

import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import styles from './page.module.scss';
import Button from '@/app/components/common/button/Button';

export default function Page() {
  const [streamKey, setStreamKey] = useState('');

  const handleCreateStreamKey = () => {
    setStreamKey(uuid());
  };

  const handleStreamKeyCopy = () => {
    navigator.clipboard.writeText(streamKey);
    alert('복사 완료');
  };

  return (
    <div className={styles.container}>
      <div className={styles.streamKey}>
        <span>
          스트림키: <label>{streamKey}</label>
        </span>
      </div>
      <div className={styles.actions}>
        <Button onClick={handleCreateStreamKey}>스트림 키 발급</Button>
        <Button onClick={handleStreamKeyCopy}>복사</Button>
      </div>
    </div>
  );
}
