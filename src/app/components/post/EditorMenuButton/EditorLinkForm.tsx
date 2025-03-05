import Button from '../../common/button/Button';
import CheckSvg from '@/app/assets/svg/CheckSvg';
import {
  useEditorLinkState,
  useEditorLinkActions,
} from '@/app/lib/hooks/post/useEditorLink';
import type { Editor } from '@tiptap/react';
import styles from './EditorMenuButton.module.scss';

interface EditorLinkFormProps {
  editor: Editor;
}

const EditorLinkForm = ({ editor }: EditorLinkFormProps) => {
  const { linkUrl, setLinkUrl, openInNewTab, setOpenInNewTab, hasPreviousUrl } =
    useEditorLinkState(editor);

  const { setLink } = useEditorLinkActions(editor, linkUrl, openInNewTab);

  return (
    <form>
      <input
        type='url'
        placeholder='URL'
        value={linkUrl}
        onChange={(e) => setLinkUrl(e.target.value)}
      />
      <label>
        <input
          type='checkbox'
          checked={openInNewTab}
          onChange={() => setOpenInNewTab((prev) => !prev)}
        />
        <div className={styles.iconWrapper}>
          <CheckSvg />
        </div>
        새 창으로 열기
      </label>
      <div className={styles.buttonGroup}>
        {hasPreviousUrl && (
          <Button
            className={styles.alertButton}
            type='submit'
            color='text-black-50'
            bgColor='bg-white'
            onClick={() => {}}
          >
            링크 제거
          </Button>
        )}
        <Button
          type='submit'
          color='text-black-50'
          bgColor='bg-white'
          disabled={false}
          onClick={setLink}
        >
          확인
        </Button>
      </div>
    </form>
  );
};

export default EditorLinkForm;
