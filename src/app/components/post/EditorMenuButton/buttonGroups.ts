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
import CodeSvg from '@/app/assets/svg/Editor/CodeSvg';
import type { Editor } from '@tiptap/react';
import type { ButtonProps } from './EditorMenuButton';

const basicButtons = (
  editor: Editor,
  isMarkdownMode: boolean
): ButtonProps[] => [
  {
    icon: BoldSvg,
    command: () => editor.chain().focus().toggleBold().run(),
    isActive: () => editor.isActive('bold'),
    disabled: isMarkdownMode,
  },
  {
    icon: ItalicSvg,
    command: () => editor.chain().focus().toggleItalic().run(),
    isActive: () => editor.isActive('italic'),
    disabled: isMarkdownMode,
  },
  {
    icon: StrikeSvg,
    command: () => editor.chain().focus().toggleStrike().run(),
    isActive: () => editor.isActive('strike'),
    disabled: isMarkdownMode,
  },
  {
    icon: UnderLineSvg,
    command: () => editor.chain().focus().toggleUnderline().run(),
    isActive: () => editor.isActive('underline'),
    disabled: isMarkdownMode,
  },
];

const formatButtons = (
  editor: Editor,
  isMarkdownMode: boolean
): ButtonProps[] => [
  {
    icon: HeadingOneSvg,
    command: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    isActive: () => editor.isActive('heading', { level: 1 }),
    disabled: isMarkdownMode,
  },
  {
    icon: HeadingTwoSvg,
    command: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    isActive: () => editor.isActive('heading', { level: 2 }),
    disabled: isMarkdownMode,
  },
  {
    icon: HeadingThreeSvg,
    command: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    isActive: () => editor.isActive('heading', { level: 3 }),
    disabled: isMarkdownMode,
  },
  {
    icon: OrderedListSvg,
    command: () => editor.chain().focus().toggleOrderedList().run(),
    isActive: () => editor.isActive('orderedList'),
    disabled: isMarkdownMode,
  },
  {
    icon: BulletListSvg,
    command: () => editor.chain().focus().toggleBulletList().run(),
    isActive: () => editor.isActive('bulletList'),
    disabled: isMarkdownMode,
  },
];

const alignButtons = (
  editor: Editor,
  isMarkdownMode: boolean
): ButtonProps[] => [
  {
    icon: AlignLeftSvg,
    command: () => editor.chain().focus().setTextAlign('left').run(),
    isActive: () => editor.isActive({ textAlign: 'left' }),
    disabled: isMarkdownMode,
  },
  {
    icon: AlignCenterSvg,
    command: () => editor.chain().focus().setTextAlign('center').run(),
    isActive: () => editor.isActive({ textAlign: 'center' }),
    disabled: isMarkdownMode,
  },
  {
    icon: AlignRightSvg,
    command: () => editor.chain().focus().setTextAlign('right').run(),
    isActive: () => editor.isActive({ textAlign: 'right' }),
    disabled: isMarkdownMode,
  },
];

const utilityButtons = (
  editor: Editor,
  isMarkdownMode: boolean
): ButtonProps[] => [
  {
    icon: CodeSvg,
    command: () => editor.chain().focus().toggleCodeBlock().run(),
    isActive: () => editor.isActive('codeBlock'),
    disabled: isMarkdownMode,
  },
];

export { basicButtons, formatButtons, alignButtons, utilityButtons };
