import ImageSvg from '@/app/assets/svg/Editor/ImageSvg';
import type { Editor } from '@tiptap/react';
import styles from './EditorMenuButton.module.scss';

interface EditorImageButtonProps {
  editor: Editor;
}

const EditorImageButton = ({ editor }: EditorImageButtonProps) => {
  return (
    <label className={styles.editorMenuButton}>
      <input type='file' accept='image/*' hidden onChange={() => {}} />
      <ImageSvg />
    </label>
  );
};

export default EditorImageButton;
