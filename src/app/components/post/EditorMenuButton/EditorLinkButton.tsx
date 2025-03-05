'use client';

import { useRef } from 'react';
import clsx from 'clsx';
import LinkSvg from '@/app/assets/svg/Editor/LinkSvg';
import useClickOutside from '@/app/lib/hooks/common/useClickOutside';
import useOverlay from '@/app/lib/hooks/common/useOverlay';
import type { Editor } from '@tiptap/react';
import styles from './EditorMenuButton.module.scss';

interface EditorLinkButtonProps {
  editor: Editor;
}

const EditorLinkButton = ({ editor }: EditorLinkButtonProps) => {
  const { isOpen, close, toggle } = useOverlay();

  const linkPanelRef = useRef<HTMLDivElement>(null);
  useClickOutside(linkPanelRef, close);

  return (
    <div ref={linkPanelRef}>
      <button
        className={clsx(styles.editorMenuButton, {
          [styles.active]: editor.isActive('link'),
        })}
        onClick={toggle}
      >
        <LinkSvg />
      </button>
      <div>{isOpen && <div>링크 제출 폼</div>}</div>
    </div>
  );
};

export default EditorLinkButton;
