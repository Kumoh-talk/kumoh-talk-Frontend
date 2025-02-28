import ImageSvg from '@/app/assets/svg/Editor/ImageSvg';
import type { Editor } from '@tiptap/react';
import styles from './EditorMenuButton.module.scss';

interface EditorImageButtonProps {
  editor: Editor;
}

const EditorImageButton = ({ editor }: EditorImageButtonProps) => {
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  return (
    <label className={styles.editorMenuButton}>
      <input type='file' accept='image/*' hidden onChange={() => {}} />
      <ImageSvg />
    </label>
  );
};

export default EditorImageButton;
