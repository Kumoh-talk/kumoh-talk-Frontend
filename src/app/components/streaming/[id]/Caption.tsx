'use client';

import { useEffect, useState } from 'react';
import styles from './caption.module.scss';
import useSocketStore from '@/app/lib/stores/socketStore';

const dummy = `안녕하세요. 저는 JPA란 무엇인가?에 대해서 발표하게 된 김컴공입니다.`;
const dummySplited = dummy.split('\n').map((line) => line.split(' '));

export default function Caption() {
  const [line, setLine] = useState(0);
  const [word, setWord] = useState(0);
  const [current, setCurrent] = useState('');
  const { caption } = useSocketStore();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(dummySplited[line].slice(0, word + 1).join(' '));
      setLine((prev) => {
        if (prev + 1 === dummySplited.length) {
          return 0;
        }
        return prev + 1;
      });
      setWord((prev) => {
        if (prev + 1 === dummySplited[line].length) {
          return 0;
        }
        return prev + 1;
      });
    }, 500);
    return () => clearInterval(interval);
  }, [line, word]);

  return (
    <div
      className={styles.caption}
      style={{ display: caption.text ? 'block' : 'none' }}
    >
      {caption.text}
    </div>
  );
}
