import { useCallback } from 'react';
import { useSubmitDraft } from '@/app/lib/hooks/post/useSubmitDraft';
import { debounce } from 'es-toolkit';
import DraftList from './DraftList';
import Button from '../../common/button/Button';
import styles from './Draft.module.scss';

interface DraftProps {
  close: () => void;
}

const Draft = ({ close }: DraftProps) => {
  const { submitDraft } = useSubmitDraft(close);
  const debouncedSubmitDraft = useCallback(debounce(submitDraft, 200), [
    submitDraft,
  ]);

  return (
    <>
      <div className={styles.head}>
        <h3>임시저장</h3>
      </div>
      <div className={styles.draft}>
        <DraftList close={close} />
      </div>
      <div className={styles.footer}>
        <Button
          className={styles.outlineButton}
          size='medium'
          color='text-black-50'
          bgColor='bg-white'
          onClick={close}
        >
          취소
        </Button>
        <Button size='medium' onClick={debouncedSubmitDraft}>
          임시 저장
        </Button>
      </div>
    </>
  );
};

export default Draft;
