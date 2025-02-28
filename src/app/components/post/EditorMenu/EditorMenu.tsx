'use client';

import { EditorMenuButton } from '../EditorMenuButton/EditorMenuButton';
import EditorImageButton from '../EditorMenuButton/EditorImageButton';
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
}

const EditorMenu = ({ editor }: EditorMenuProps) => {
  const EditorMode = [
    { value: 'default', label: '기본모드' },
    { value: 'markdown', label: '마크다운' },
  ];

  const buttonGroups = [
    basicButtons(editor),
    formatButtons(editor),
    alignButtons(editor),
    utilityButtons(editor),
  ];

  return (
    <div className={styles.editorMenu}>
      <EditorImageButton editor={editor} />
      <div className={styles.editorMenuDivider} />
      {buttonGroups.map((group) => (
        <>
          {group.map((button, idx) => (
            <EditorMenuButton
              key={idx}
              icon={button.icon}
              command={button.command}
              isActive={button.isActive}
            />
          ))}
          <div className={styles.editorMenuDivider} />
        </>
      ))}
      <div className={styles.editorModeSelect}>
        <Select options={EditorMode} onChange={() => {}} />
      </div>
    </div>
  );
};

export default EditorMenu;
