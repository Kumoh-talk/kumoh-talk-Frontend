'use client';

import { Fragment } from 'react';
import { useCurrentEditor } from '@tiptap/react';
import { usePostMode } from '@/app/lib/contexts/post/PostModeContext';
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
import styles from './EditorMenu.module.scss';

const EditorMenu = () => {
  const { editor } = useCurrentEditor();
  const { isMarkdownMode, setIsMarkdownMode } = usePostMode();

  if (!editor) return;

  const EditorMode = [
    { value: 'default', label: '기본모드' },
    { value: 'markdown', label: '마크다운' },
  ];

  const buttonGroups = [
    basicButtons(editor, isMarkdownMode),
    formatButtons(editor, isMarkdownMode),
    alignButtons(editor, isMarkdownMode),
    utilityButtons(editor, isMarkdownMode),
  ];

  const handleModeChange = (value: string) => {
    setIsMarkdownMode(value === 'markdown');
    alert(
      '작성 모드를 변경하시겠습니까?\n현재 서식이 유지되지 않을 수 있습니다.'
    );
  };

  return (
    <div className={styles.editorMenu}>
      <EditorImageButton editor={editor} />
      <EditorLinkButton editor={editor} />
      <EditorFileButton editor={editor} />

      <div className={styles.editorMenuDivider} />
      {buttonGroups.map((group, groupIdx) => (
        <Fragment key={groupIdx}>
          {group.map((button, idx) => (
            <EditorMenuButton
              key={`${groupIdx}-${idx}`}
              icon={button.icon}
              command={button.command}
              isActive={button.isActive}
              disabled={button.disabled}
            />
          ))}
          <div className={styles.editorMenuDivider} />
        </Fragment>
      ))}
      <div className={styles.editorModeSelect}>
        <Select options={EditorMode} onChange={handleModeChange} />
      </div>
    </div>
  );
};

export default EditorMenu;
