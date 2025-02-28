import BoldSvg from '@/app/assets/svg/Editor/BoldSvg';
import ItalicSvg from '@/app/assets/svg/Editor/ItalicSvg';
import StrikeSvg from '@/app/assets/svg/Editor/StrikeSvg';
import UnderLineSvg from '@/app/assets/svg/Editor/UnderLineSvg';
import HeadingOneSvg from '@/app/assets/svg/Editor/HeadingOneSvg';
import HeadingTwoSvg from '@/app/assets/svg/Editor/HeadingTwoSvg';
import HeadingThreeSvg from '@/app/assets/svg/Editor/HeadingThreeSvg';
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
  {
    icon: StrikeSvg,
    command: () => editor.chain().focus().toggleStrike().run(),
    isActive: () => editor.isActive('strike'),
  },
  {
    icon: UnderLineSvg,
    command: () => editor.chain().focus().toggleUnderline().run(),
    isActive: () => editor.isActive('underline'),
  },
];

const formatButtons = (editor: Editor): ButtonProps[] => [
  {
    icon: HeadingOneSvg,
    command: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    isActive: () => editor.isActive('heading', { level: 1 }),
  },
  {
    icon: HeadingTwoSvg,
    command: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    isActive: () => editor.isActive('heading', { level: 2 }),
  },
  {
    icon: HeadingThreeSvg,
    command: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    isActive: () => editor.isActive('heading', { level: 3 }),
  },
];

export { basicButtons, formatButtons };
