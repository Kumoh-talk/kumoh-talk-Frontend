import { ReactNode, HTMLAttributes } from 'react';
import { usePostMode } from './PostModeContext';
import { EditorProvider } from '@tiptap/react';

import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import CustomImage from '@/app/components/post/ImageNode/ImageNode';
import FileNode from '@/app/components/post/FileNode/FileNode';
import Link from '@tiptap/extension-link';
import LinkPreviewNode from '@/app/components/post/LinkPreview/LinkPreviewNode';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { all, createLowlight } from 'lowlight';

interface EditorProviderProps {
  editorContainerProps?: HTMLAttributes<HTMLDivElement>;
  slotBefore?: ReactNode;
  children?: ReactNode;
  slotAfter?: ReactNode;
}

const lowlight = createLowlight(all);

const extensions = [
  StarterKit.configure({
    codeBlock: false,
  }),
  Underline,
  CustomImage,
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  CodeBlockLowlight.configure({
    lowlight,
  }),
  Link.configure({
    autolink: true,
    defaultProtocol: 'https',
  }),
  LinkPreviewNode,
  FileNode,
];

const PostEditorProvider = ({
  slotBefore,
  children,
  slotAfter,
  editorContainerProps,
}: EditorProviderProps) => {
  const { isMarkdownMode } = usePostMode();

  return (
    <EditorProvider
      editorContainerProps={editorContainerProps}
      key={`editor-${isMarkdownMode}`}
      extensions={extensions}
      enablePasteRules={isMarkdownMode}
      enableInputRules={isMarkdownMode}
      immediatelyRender={false}
      slotBefore={slotBefore}
      slotAfter={slotAfter}
    >
      {children}
    </EditorProvider>
  );
};

export default PostEditorProvider;
