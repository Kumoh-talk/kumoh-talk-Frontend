import { useSaveDraft } from '@/app/lib/hooks/post/useSaveDraft';
import { debounce } from 'es-toolkit';
import DraftList from './DraftList';
import Button from '../../common/button/Button';
import styles from './Draft.module.scss';

interface DraftProps {
  close: () => void;
}

const Draft = ({ close }: DraftProps) => {
  const { saveDraft } = useSaveDraft(close);
  const debouncedSubmitDraft = debounce(saveDraft, 200);

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
