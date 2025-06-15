'use client';

import styles from './voteResultCard.module.scss';
import clsx from 'clsx';
import { X } from 'lucide-react';
import { Vote } from '@/app/lib/types/streaming/streaming';
import useSocketStore from '@/app/lib/stores/socketStore';
import { useEffect, useState } from 'react';

interface Props {
  vote: Vote;
  isShow: boolean;
  handleClose: () => void;
  handleOpen: () => void;
}

export default function VoteResultCard({
  vote,
  isShow,
  handleClose,
  handleOpen,
}: Props) {
  const { voteId, title, selects } = vote;
  const { voteResult, setIsVoteShow, isVoteFinished } = useSocketStore();
  const [timeLeft, setTimeLeft] = useState(15);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isVoteFinished) {
      const timer = setTimeout(() => {
        setIsVoteShow(false);
      }, 15000);

      return () => clearTimeout(timer);
    }
  }, [isVoteFinished, setIsVoteShow]);

  // 현재 투표의 결과 찾기
  const currentVoteResult = voteResult?.voteId === voteId ? voteResult : null;

  // 전체 투표 수 계산
  const totalVotes =
    currentVoteResult?.voteCounts.reduce(
      (sum, count) => sum + count.count,
      0
    ) || 0;

  return (
    <div className={clsx(styles.container, isShow ? styles.show : styles.hide)}>
      <div className={styles.header}>
        <h2>투표 결과</h2>
        <div className={styles.timer}>자동 종료까지 {timeLeft}초</div>
        <button onClick={isShow ? handleClose : handleOpen}>
          <X />
        </button>
      </div>
      <div className={styles.content}>
        <h3>{title}</h3>
        <div className={styles.resultWrapper}>
          {selects.map((select) => {
            const voteCount =
              currentVoteResult?.voteCounts.find(
                (count) => count.selectId === select.selectId
              )?.count || 0;
            const percentage =
              totalVotes > 0 ? Math.round((voteCount / totalVotes) * 100) : 0;

            return (
              <div key={select.selectId} className={styles.resultItem}>
                <div className={styles.resultHeader}>
                  <span className={styles.content}>{select.content}</span>
                  <span className={styles.percentage}>{percentage}%</span>
                </div>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progress}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className={styles.count}>{voteCount}표</span>
              </div>
            );
          })}
        </div>
        <div className={styles.total}>총 {totalVotes}표</div>
      </div>
    </div>
  );
}
