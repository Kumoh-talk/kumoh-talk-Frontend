'use client';

import { useRef } from 'react';
import clsx from 'clsx';
import LinkSvg from '@/app/assets/svg/Editor/LinkSvg';
import EditorLinkForm from './EditorLinkForm';
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
    <div className={styles.linkWrapper} ref={linkPanelRef}>
      <button
        className={clsx(styles.editorMenuButton, {
          [styles.active]: editor.isActive('link'),
        })}
        onClick={toggle}
      >
        <LinkSvg />
      </button>
      <div className={clsx(styles.linkPanel, { [styles.show]: isOpen })}>
        {isOpen && <EditorLinkForm editor={editor} close={close} />}
      </div>
    </div>
  );
};

export default EditorLinkButton;
