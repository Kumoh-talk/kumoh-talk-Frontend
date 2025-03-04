import FileSvg from '@/app/assets/svg/Editor/FileSvg';
import type { Editor } from '@tiptap/react';
import type { FileInfo } from '../FileNode/FileComponent';
import styles from './EditorMenuButton.module.scss';

interface EditorFileButtonProps {
  editor: Editor;
}

const EditorFileButton = ({ editor }: EditorFileButtonProps) => {
  const getFileInfo = (file: File): FileInfo => {
    const fileUrl = URL.createObjectURL(file);
    const fileSize = (file.size / (1024 * 1024)).toFixed(2) + 'MB';

    let fileName = file.name;
    let fileType = '';

    const lastDotIndex = file.name.lastIndexOf('.');

    if (lastDotIndex !== -1) {
      fileName = file.name.slice(0, lastDotIndex);
      fileType = file.name.slice(lastDotIndex + 1);
    }

    return { fileUrl, fileSize, fileName, fileType };
  };

  const handleEditorFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const fileInfo = getFileInfo(file);
  };

  return (
    <label className={styles.editorMenuButton}>
      <input type='file' hidden onChange={handleEditorFile} />
      <FileSvg />
    </label>
  );
};

export default EditorFileButton;
