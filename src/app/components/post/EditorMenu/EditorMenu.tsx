'use client';

import { EditorMenuButton } from '../EditorMenuButton/EditorMenuButton';
import Select from '../../apply/Select/Select';
import { basicButtons } from '../EditorMenuButton/buttonGroups';
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

  const buttonGroups = [basicButtons(editor)];

  return (
    <div className={styles.editorMenu}>
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
