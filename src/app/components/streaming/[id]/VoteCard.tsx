'use client';

import { FormEvent, useState } from 'react';
import Button from '../../common/button/Button';
import styles from './voteCard.module.scss';
import clsx from 'clsx';
import { X } from 'lucide-react';

interface Props {
  vote: {
    name: string;
    multiple: boolean;
    select: {
      id: number;
      content: string;
    }[];
  };
  initialVote: boolean;
  isShow: boolean;
  handleClose: () => void;
  handleOpen: () => void;
}

export default function VoteCard({
  vote,
  initialVote,
  isShow,
  handleClose,
  handleOpen,
}: Props) {
  const { name, multiple, select } = vote;
  const [selectedVotes, setSelectedVotes] = useState<number[]>([]);

  const handleVote = (e: FormEvent) => {
    e.preventDefault();
    console.log('Selected votes:', selectedVotes);
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
    <div
      className={clsx(styles.container, isShow ? styles.show : styles.hide)}
      style={{ display: initialVote ? 'none' : 'flex' }}
    >
      <div className={styles.header}>
        <h2>투표</h2>
        <button onClick={isShow ? handleClose : handleOpen}>
          <X />
        </button>
      </div>
      <div className={styles.content}>
        <h3>{name}</h3>
        <form className={styles.selectWrapper} onSubmit={handleVote}>
          {select.map((item) => (
            <div key={item.id} className={styles.select}>
              <div>
                <input
                  className={styles.selectButton}
                  type={multiple ? 'checkbox' : 'radio'}
                  name='vote'
                  value={item.id}
                  checked={selectedVotes.includes(item.id)}
                  onChange={() => handleVoteChange(item.id)}
                />
              </div>
              <div>
                <p>{item.content}</p>
                <progress max='100' value='70' />
              </div>
            </div>
          ))}
          <div className={styles.actions}>
            <Button bgColor='bg-white' color='text-black-85'>
              선택하기
            </Button>
            <Button bgColor='bg-white' color='text-black-85'>
              결과보기
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
