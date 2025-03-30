import { toast } from 'react-toastify';
import ImageSvg from '@/app/assets/svg/Editor/ImageSvg';
import { MAX_IMAGE_SIZE } from '@/app/lib/constants/common/file';
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
      editor
        .chain()
        .focus()
        .setImage({ src: imageUrl, title: file.name })
        .run();
    }
  };

  const handleEditorImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (file.size > MAX_IMAGE_SIZE) {
      toast.warn('10MB 이하의 이미지를 업로드 해주세요.');
      event.target.value = '';
      return;
    }

    addImageToEditor(file);
    event.target.value = '';
  };

  return (
    <label className={styles.editorMenuButton}>
      <input type='file' accept='image/*' hidden onChange={handleEditorImage} />
      <ImageSvg />
    </label>
  );
};

export default EditorImageButton;
