'use client';

import { EditorMenuButton } from '../EditorMenuButton/EditorMenuButton';
import EditorImageButton from '../EditorMenuButton/EditorImageButton';
import EditorLinkButton from '../EditorMenuButton/EditorLinkButton';
import EditorFileButton from '../EditorMenuButton/EditorFileButton';
import Select from '../../apply/Select/Select';
import {
  basicButtons,
  formatButtons,
  alignButtons,
  utilityButtons,
} from '../EditorMenuButton/buttonGroups';
import type { Editor } from '@tiptap/react';
import styles from './EditorMenu.module.scss';

interface EditorMenuProps {
  editor: Editor;
  isMarkdwonMode: boolean;
  onModeChange: (value: string) => void;
}

const EditorMenu = ({
  editor,
  isMarkdwonMode,
  onModeChange,
}: EditorMenuProps) => {
  const EditorMode = [
    { value: 'default', label: '기본모드' },
    { value: 'markdown', label: '마크다운' },
  ];

  const buttonGroups = [
    basicButtons(editor, isMarkdwonMode),
    formatButtons(editor, isMarkdwonMode),
    alignButtons(editor, isMarkdwonMode),
    utilityButtons(editor, isMarkdwonMode),
  ];

  return (
    <div className={styles.editorMenu}>
      <EditorImageButton editor={editor} />
      <EditorLinkButton editor={editor} />
      <EditorFileButton editor={editor} />

      <div className={styles.editorMenuDivider} />
      {buttonGroups.map((group) => (
        <>
          {group.map((button, idx) => (
            <EditorMenuButton
              key={idx}
              icon={button.icon}
              command={button.command}
              isActive={button.isActive}
              disabled={button.disabled}
            />
          ))}
          <div className={styles.editorMenuDivider} />
        </>
      ))}
      <div className={styles.editorModeSelect}>
        <Select options={EditorMode} onChange={onModeChange} />
      </div>
    </div>
  );
};

export default EditorMenu;
