'use client';

import { FileText, Video, Vote } from 'lucide-react';
import styles from './utilityTab.module.scss';
import SeminarSummaryPopup from './SeminarSummaryPopup';
import { useContext, useState } from 'react';
import VoteCard from './VoteCard';
import { SideTabContext } from './SideTabProvider';
import useSocketStore from '@/app/lib/stores/socketStore';
import VoteResultCard from './VoteResultCard';

interface Props {
  accessToken?: string;
  streamId: string;
}

export default function UtilityTab({ accessToken, streamId }: Props) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isVoteCardShow, setIsVoteCardShow] = useState(true);
  const [initialVote, setInitialVote] = useState(true);
  const { setIsSubVideoVisible } = useContext(SideTabContext);
  const { vote, isVoteShow, isVoteFinished, setIsVoteShow } = useSocketStore();

  const handleVoteClose = () => {
    setIsVoteCardShow(false);
  };

  const handleVoteOpen = () => {
    if (initialVote) {
      setInitialVote(false);
    }
    setIsVoteCardShow(true);
  };

  const handleSubVideoToggle = () => {
    setIsSubVideoVisible((isSubVideoVisible: boolean) => !isSubVideoVisible);
  };

  return (
    <div className={styles.container}>
      <div>
        <SeminarSummaryPopup
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
        />
        <button
          onClick={() => setModalOpen(true)}
          className={styles.iconButton}
        >
          <FileText />
        </button>
      </div>
      <div>
        <button className={styles.iconButton} onClick={handleSubVideoToggle}>
          <Video />
        </button>
      </div>
      {isVoteShow ? (
        <div>
          <button onClick={handleVoteOpen} className={styles.iconButton}>
            <Vote />
          </button>
          {isVoteFinished ? (
            <VoteResultCard
              vote={vote}
              isShow={isVoteCardShow}
              handleClose={handleVoteClose}
              handleOpen={handleVoteOpen}
            />
          ) : (
            <VoteCard
              accessToken={accessToken}
              streamId={streamId}
              vote={vote}
              isShow={isVoteCardShow}
              handleClose={handleVoteClose}
              handleOpen={handleVoteOpen}
            />
          )}
        </div>
      ) : null}
    </div>
  );
}
