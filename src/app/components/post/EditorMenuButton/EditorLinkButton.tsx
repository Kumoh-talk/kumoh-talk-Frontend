'use client';

import clsx from 'clsx';
import LinkSvg from '@/app/assets/svg/Editor/LinkSvg';
import type { Editor } from '@tiptap/react';
import styles from './EditorMenuButton.module.scss';

interface EditorLinkButtonProps {
  editor: Editor;
}

const EditorLinkButton = ({ editor }: EditorLinkButtonProps) => {
  return (
    <button
      className={clsx(styles.editorMenuButton, {
        [styles.active]: editor.isActive('link'),
      })}
      onClick={() => {}}
    >
      <LinkSvg />
    </button>
  );
};

export default EditorLinkButton;
