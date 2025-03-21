import { useRef, useEffect, useMemo } from 'react';
import { getRelativeTime } from '@/app/lib/utils/post/dateFormatter';
import { useDrafts } from '@/app/lib/hooks/post/useDrafts';
import useIntersectionObserver from '@/app/lib/hooks/common/useIntersectionObserver';
import DraftItem from './DraftItem';
import styles from './Draft.module.scss';

interface DraftListProps {
  close: () => void;
}

const DraftList = ({ close }: DraftListProps) => {
  const { draftList, state, hasNextPage, fetchNextPage, loadDraft, handleDeleteDraft } = useDrafts(close);
  const rootRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const observerOption = useMemo(() => {
    return { root: rootRef.current };
  }, []);

  const { entries: [entry] } = useIntersectionObserver(sentinelRef, observerOption);
  const isIntersecting = entry?.isIntersecting;

  useEffect(() => {
    if (state !== 'loading' && isIntersecting && hasNextPage) {
      fetchNextPage();
    }

  }, [isIntersecting, state, hasNextPage]);

  if (state === 'fetched' && draftList.length === 0) {
    return <p>임시 저장된 글이 없습니다.</p>;
  }

  return (
    <div className={styles.draftList} ref={rootRef}>
      {draftList.map((draft) => {
        const { boardId, updatedAt, title } = draft;

        return (
          <DraftItem
            key={boardId}
            boardId={boardId}
            updatedAt={getRelativeTime(updatedAt)}
            title={title}
            loadDraft={loadDraft}
            onDelete={handleDeleteDraft}
          />
        );
      })}
      {hasNextPage && <div className={styles.sentinel} ref={sentinelRef} />}
      {state === 'loading' && (
        <div className={styles.loaderWrapper}>
          <div className={styles.loader} />
        </div>
      )}
    </div>
  );
};

export default DraftList;