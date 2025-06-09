'use client';

import { FileText, Video, Vote } from 'lucide-react';
import styles from './utilityTab.module.scss';
import SeminarSummaryPopup from './SeminarSummaryPopup';
import { useContext, useState } from 'react';
import VoteCard from './VoteCard';
import { SideTabContext } from './SideTabProvider';

const dummyVote = {
  name: '몇 학년이신가요?',
  multiple: false,
  select: [
    {
      id: 1,
      content: '1학년',
    },
    {
      id: 2,
      content: '2학년',
    },
    {
      id: 3,
      content: '3학년',
    },
    {
      id: 4,
      content: '4학년',
    },
  ],
};

export default function UtilityTab() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isVoteShow, setIsVoteShow] = useState(true);
  const [initialVote, setInitialVote] = useState(true);
  const { setIsSubVideoVisible } = useContext(SideTabContext);

  const handleVoteClose = () => {
    setIsVoteShow(false);
  };

  const handleVoteOpen = () => {
    if (initialVote) {
      setInitialVote(false);
    }
    setIsVoteShow(true);
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
          content='JDBC를 직접 사용하면 SQL문 작성, 데이터 매핑 등이 번거롭고 유지보수가 어려웠음. 이를 해결하기 위해 EJB(Entity Bean) → Hibernate 등의 ORM 등장 → JPA(Java Persistence API)로 표준화됨. Spring과 결합하여 생산성이 크게 향상되면서 JPA가 대중적으로 널리 사용됨.'
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
      <div>
        <button onClick={handleVoteOpen} className={styles.iconButton}>
          <Vote />
        </button>
        <VoteCard
          vote={dummyVote}
          initialVote={initialVote}
          isShow={isVoteShow}
          handleClose={handleVoteClose}
          handleOpen={handleVoteOpen}
        />
      </div>
    </div>
  );
}
