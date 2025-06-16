'use client';

import { FormEvent, useState, useTransition } from 'react';
import Button from '../../common/button/Button';
import styles from './voteCard.module.scss';
import clsx from 'clsx';
import { X } from 'lucide-react';
import { Vote } from '@/app/lib/types/streaming/streaming';
import useSocketStore from '@/app/lib/stores/socketStore';
import { END_POINTS } from '@/app/lib/constants/common/path';
import { parseJwt } from '@/app/lib/apis/auth';
import { UserRoleValidator } from '@/app/lib/apis/userRoleValidator';

interface Props {
  accessToken?: string;
  streamId: string;
  vote: Vote;
  isShow: boolean;
  handleClose: () => void;
  handleOpen: () => void;
}

export default function VoteCard({
  accessToken,
  streamId,
  vote,
  isShow,
  handleClose,
  handleOpen,
}: Props) {
  const { voteId, title, multiple, selects } = vote;
  const [selectedVotes, setSelectedVotes] = useState<number[]>([]);
  const [isPending, startTransition] = useTransition();
  const { stompClient, setLastSend, isSelected, setIsSelected } =
    useSocketStore();
  const userRole = accessToken ? parseJwt(accessToken).USER_ROLE : '';

  const handleVote = (e: FormEvent) => {
    e.preventDefault();

    if (!selectedVotes.length) {
      return;
    }

    if (!UserRoleValidator.guest(userRole)) {
      alert('로그인 후 이용가능합니다.');
      return;
    }

    if (!UserRoleValidator.user(userRole)) {
      alert('권한이 없습니다.');
      return;
    }

    startTransition(() => {
      setLastSend({
        destination: END_POINTS.PUBLISH.VOTE_SELECT(
          streamId,
          JSON.stringify(voteId)
        ),
        body: JSON.stringify({
          selects: selectedVotes,
        }),
      });
      stompClient?.send(
        END_POINTS.PUBLISH.VOTE_SELECT(streamId, JSON.stringify(voteId)),
        {
          Authorization: `Bearer ${accessToken}`,
        },
        JSON.stringify({
          selects: selectedVotes,
        })
      );
      setIsSelected(true);
    });
  };

  const handleVoteChange = (itemId: number) => {
    if (multiple) {
      setSelectedVotes((prev) =>
        prev.includes(itemId)
          ? prev.filter((id) => id !== itemId)
          : [...prev, itemId]
      );
    } else {
      setSelectedVotes([itemId]);
    }
  };

  return (
    <div className={clsx(styles.container, isShow ? styles.show : styles.hide)}>
      <div className={styles.header}>
        <h2>투표</h2>
        <button onClick={isShow ? handleClose : handleOpen}>
          <X />
        </button>
      </div>
      <div className={styles.content}>
        <h3>{title}</h3>
        <form className={styles.selectWrapper} onSubmit={handleVote}>
          {selects.map((item) => (
            <div key={item.selectId} className={styles.select}>
              <div>
                <input
                  className={styles.selectButton}
                  type={multiple ? 'checkbox' : 'radio'}
                  name='vote'
                  value={item.selectId}
                  checked={selectedVotes.includes(item.selectId)}
                  onChange={() => handleVoteChange(item.selectId)}
                  disabled={isPending || isSelected}
                />
              </div>
              <div>
                <p>{item.content}</p>
                <progress max='100' value='70' />
              </div>
            </div>
          ))}
          <div className={styles.actions}>
            <Button
              bgColor='bg-white'
              color='text-black-85'
              disabled={isPending || isSelected}
            >
              선택하기
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
