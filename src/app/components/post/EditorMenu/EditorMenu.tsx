'use client';

import Select from '../../apply/Select/Select';
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

  return (
    <div className={styles.editorMenu}>
      <button
        className={styles.editorMenuButton}
        type='button'
        onClick={() => {}}
      >
        에디너 메뉴 버튼
      </button>
      <div className={styles.editorMenuDivider} />
      <div className={styles.editorModeSelect}>
        <Select options={EditorMode} onChange={() => {}} />
      </div>
    </div>
  );
};

export default EditorMenu;
