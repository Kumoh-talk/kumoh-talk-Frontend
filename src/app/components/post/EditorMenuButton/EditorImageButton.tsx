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

  const addImageToEditor = async (file: File) => {
    const imageUrl = await convertToBase64(file);

    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl, title: file.name }).run();
    }
  };

  const handleEditorImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    addImageToEditor(file);
  };

  return (
    <label className={styles.editorMenuButton}>
      <input type='file' accept='image/*' hidden onChange={handleEditorImage} />
      <ImageSvg />
    </label>
  );
};

export default EditorImageButton;
