import { toast } from 'react-toastify';
import { useCurrentEditor } from '@tiptap/react';
import { usePostContent } from '@/app/lib/contexts/post/PostContentContext';
import { createDraft, editDraft } from '@/app/lib/apis/post/submitDraft';
import DraftList from './DraftList';
import Button from '../../common/button/Button';
import styles from './Draft.module.scss';

interface DraftProps {
  close: () => void;
}

const Draft = ({ close }: DraftProps) => {
  const { boardId, setBoardId, title, tagList, boardHeadImageUrl } = usePostContent();
  const { editor } = useCurrentEditor();

  const submitDraft = async () => {
    if (!editor) return;

    const handleSuccess = () => {
      close();
      toast.success('작성 중인 글이 저장되었습니다.');
    };

    const handleError = () => toast.error('작성 글 저장에 실패했습니다.');

    if (boardId) {
      await editDraft(
        {
          id: boardId,
          title,
          contents: editor.getHTML(),
          categoryName: tagList,
          boardHeadImageUrl,
          editor,
        },
        { onSuccess: handleSuccess, onError: handleError }
      );
    } else {
      const newBoardId = await createDraft(
        {
          title,
          contents: editor.getHTML(),
          categoryName: tagList,
          boardType: 'SEMINAR',
          boardHeadImageUrl,
          editor,
        },
        { onSuccess: handleSuccess, onError: handleError }
      );

      if (newBoardId) {
        setBoardId(newBoardId);
      }
    }
  };

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
        <Button size='medium' onClick={submitDraft}>
          임시 저장
        </Button>
      </div>
    </>
  );
};

export default Draft;
