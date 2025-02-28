import BoldSvg from '@/app/assets/svg/Editor/BoldSvg';
import ItalicSvg from '@/app/assets/svg/Editor/ItalicSvg';
import type { Editor } from '@tiptap/react';
import type { ButtonProps } from './EditorMenuButton';

const basicButtons = (editor: Editor): ButtonProps[] => [
  {
    icon: BoldSvg,
    command: () => editor.chain().focus().toggleBold().run(),
    isActive: () => editor.isActive('bold'),
  },
  {
    icon: ItalicSvg,
    command: () => editor.chain().focus().toggleItalic().run(),
    isActive: () => editor.isActive('italic'),
  },
];

export { basicButtons };
