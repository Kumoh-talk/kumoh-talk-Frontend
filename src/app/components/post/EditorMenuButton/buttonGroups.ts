import BoldSvg from '@/app/assets/svg/Editor/BoldSvg';
import ItalicSvg from '@/app/assets/svg/Editor/ItalicSvg';
import StrikeSvg from '@/app/assets/svg/Editor/StrikeSvg';
import UnderLineSvg from '@/app/assets/svg/Editor/UnderLineSvg';
import HeadingOneSvg from '@/app/assets/svg/Editor/HeadingOneSvg';
import HeadingTwoSvg from '@/app/assets/svg/Editor/HeadingTwoSvg';
import HeadingThreeSvg from '@/app/assets/svg/Editor/HeadingThreeSvg';
import OrderedListSvg from '@/app/assets/svg/Editor/OrderedListSvg';
import BulletListSvg from '@/app/assets/svg/Editor/BulletListSvg';
import AlignLeftSvg from '@/app/assets/svg/Editor/AlignLeftSvg';
import AlignCenterSvg from '@/app/assets/svg/Editor/AlignCenterSvg';
import AlignRightSvg from '@/app/assets/svg/Editor/AlignRightSvg';
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
  {
    icon: OrderedListSvg,
    command: () => editor.chain().focus().toggleOrderedList().run(),
    isActive: () => editor.isActive('orderedList'),
  },
  {
    icon: BulletListSvg,
    command: () => editor.chain().focus().toggleBulletList().run(),
    isActive: () => editor.isActive('bulletList'),
  },
];

const alignButtons = (editor: Editor): ButtonProps[] => [
  {
    icon: AlignLeftSvg,
    command: () => editor.chain().focus().setTextAlign('left').run(),
    isActive: () => editor.isActive({ textAlign: 'left' }),
  },
  {
    icon: AlignCenterSvg,
    command: () => editor.chain().focus().setTextAlign('center').run(),
    isActive: () => editor.isActive({ textAlign: 'center' }),
  },
  {
    icon: AlignRightSvg,
    command: () => editor.chain().focus().setTextAlign('right').run(),
    isActive: () => editor.isActive({ textAlign: 'right' }),
  },
];

export { basicButtons, formatButtons, alignButtons };
