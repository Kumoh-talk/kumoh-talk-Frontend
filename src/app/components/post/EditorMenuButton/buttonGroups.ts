import BoldSvg from '@/app/assets/svg/Editor/BoldSvg';
import type { Editor } from '@tiptap/react';
import type { ButtonProps } from './EditorMenuButton';

const basicButtons = (editor: Editor): ButtonProps[] => [
  {
    icon: BoldSvg,
    command: () => editor.chain().focus().toggleBold().run(),
    isActive: () => editor.isActive('bold'),
  },
];

export { basicButtons };
