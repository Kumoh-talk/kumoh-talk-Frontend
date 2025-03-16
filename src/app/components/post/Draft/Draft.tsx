import { usePostContent } from '@/app/lib/contexts/post/PostContentContext';
import { useCurrentEditor } from '@tiptap/react';
import { toast } from 'react-toastify';
import { postDraft } from '@/app/lib/apis/post/boards';
import DraftList from './DraftList';
import Button from '../../common/button/Button';
import type { PostBoardsProps } from '@/app/lib/apis/post/boards';
import styles from './Draft.module.scss';

interface DraftProps {
  close: () => void;
}

const Draft = ({ close }: DraftProps) => {
  const { title, tagList, boardHeadImageUrl } = usePostContent();
  const { editor } = useCurrentEditor();

  const submitDraft = async () => {
    if (!editor) return;

    const draft: PostBoardsProps = {
      title,
      contents: editor?.getHTML(),
      categoryName: tagList,
      boardType: 'SEMINAR',
    };

    if (boardHeadImageUrl) {
      draft.boardHeadImageUrl = boardHeadImageUrl;
    }

    try {
      const response = await postDraft(draft);
      const { success } = response.data;

      if (success === 'false') {
        toast.error('작성 글 저장에 실패했습니다.');
        return;
      }

      close();
      toast.success('작성 중인 글이 저장되었습니다.');
    } catch (error) {
      toast.error('작성 글 저장에 실패했습니다.');
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
