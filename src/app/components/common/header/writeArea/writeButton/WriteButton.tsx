'use client';

import { useState } from 'react';
import SelectBubble from './selectBubble/SelectBubble';
import styles from './writeButton.module.scss';
import Button from '../../../button/Button';

export default function WriteButton({
  isAdmin,
  isSeminarWriter,
}: {
  isAdmin: boolean;
  isSeminarWriter: boolean;
}) {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <Button className={styles.login} onClick={() => setIsActive(true)}>
        작성하기
      </Button>
      {isActive && (
        <SelectBubble
          className={styles.bubble}
          isAdmin={isAdmin}
          isSeminarWriter={isSeminarWriter}
          onClose={() => setIsActive(false)}
        />
      )}
    </>
  );
}
