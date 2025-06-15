'use client';

import Button from '@/app/components/common/button/Button';
import { useState } from 'react';
import styles from './streamKeyField.module.scss';
import { createStreamKey } from '@/app/lib/apis/streaming/streamKeyActions';

export default function StreamKeyField() {
  const [streamKey, setStreamKey] = useState('');

  const handleCreateStreamKey = async () => {
    const newStreamKey = await createStreamKey();
    setStreamKey(newStreamKey);
  };

  const handleStreamKeyCopy = () => {
    navigator.clipboard.writeText(streamKey);
    alert('복사 완료');
  };

  return (
    <>
      <div className={styles.streamKey}>
        <span>
          스트림키: <label>{streamKey}</label>
        </span>
      </div>
      <div className={styles.actions}>
        <Button onClick={handleCreateStreamKey}>스트림 키 발급</Button>
        <Button onClick={handleStreamKeyCopy}>복사</Button>
      </div>
    </>
  );
}
