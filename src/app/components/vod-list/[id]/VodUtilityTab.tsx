'use client';

import { FileText, Video } from 'lucide-react';
import styles from './vodUtilityTab.module.scss';
import { useContext, useState } from 'react';
import { SideTabContext } from '../../streaming/[id]/SideTabProvider';
import VodSummaryPopup from './VodSummaryPopup';

interface Props {
  summary: string;
}

export default function VodUtilityTab({ summary }: Props) {
  const [isModalOpen, setModalOpen] = useState(false);
  const { setIsSubVideoVisible } = useContext(SideTabContext);

  const handleSubVideoToggle = () => {
    setIsSubVideoVisible((isSubVideoVisible: boolean) => !isSubVideoVisible);
  };

  return (
    <div className={styles.container}>
      <div>
        <VodSummaryPopup
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          summary={summary}
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
    </div>
  );
}
