import { findAttachNodes } from '@/app/lib/utils/post/editorFileUtils';
import FileSvg from '@/app/assets/svg/Editor/FileSvg';
import { MSG, CUSTOM_NODE } from '@/app/lib/constants/post/board';
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

  const insertFilePreview = (fileInfo: FileInfo) => {
    const content = {
      type: CUSTOM_NODE.ATTACH,
      attrs: fileInfo,
    };

    editor?.commands.insertContent(content);
  };

  const deleteFilePreview = () => {
    editor.commands.command(({ tr, state, dispatch }) => {
      let deleted = false;

      state.doc.descendants((node, pos) => {
        if (node.type.name === CUSTOM_NODE.ATTACH) {
          if (dispatch) {
            tr.delete(pos, pos + node.nodeSize);
          }
          deleted = true;
        }
      });

      return deleted;
    });
  };

  const handleEditorFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const attachNodes = findAttachNodes(editor);

    if (attachNodes.length === 0) {
      const fileInfo = getFileInfo(file);
      insertFilePreview(fileInfo);
      event.target.value = '';
      return;
    }

    const confirm = window.confirm(MSG.CONFIRM_CHANGE_FILE);
    if (!confirm) return;

    deleteFilePreview();

    const fileInfo = getFileInfo(file);
    insertFilePreview(fileInfo);
    event.target.value = '';
  };

  return (
    <label className={styles.editorMenuButton}>
      <input type='file' hidden onChange={handleEditorFile} />
      <FileSvg />
    </label>
  );
};

export default EditorFileButton;
